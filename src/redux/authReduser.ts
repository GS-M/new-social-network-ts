import { stopSubmit } from "redux-form";
import { authAPI, secirityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

// export type initialStateType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     isLoading: boolean | null,
//     captchaUrl: string | null
// }

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isLoading: false,
    captchaUrl: null as string | null //если Null то каптча не обязательна
}
export type initialStateType = typeof initialState

export const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                userId: 'dsadsdsa',/////////
                ...state,
                ...action.data,
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }

        default:
            return state;
    }
}

type setAuthUserDataActionDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setAuthUserDataActionDataType
}
export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean):
    setAuthUserDataActionType => ({
        type: SET_USER_DATA,
        data: { id, email, login, isAuth }
    })

type getCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL,
    captchaUrl: string
}
export const getCaptchaUrlAC = (captchaUrl: string):
    getCaptchaUrlActionType => ({ type: GET_CAPTCHA_URL, captchaUrl })

export const getAuthUserDataTC = () => {
    return async (dispatch: any) => {
        let data = await authAPI.setUserData()
        if (data.resultCode === 0) { //Залогинен ли?
            let { id, email, login } = data.data
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any) => {              //any
    return async (dispatch: any) => {
        let responce = await authAPI.login(email, password, rememberMe, captcha)
        if (responce.data.resultCode === 0) {
            dispatch(getAuthUserDataTC())
        } else {
            if (responce.data.resultCode === 10) {
                dispatch(getCapchaUrlTC())
            }
            let message = responce.data.messages.length > 0 ? responce.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }));
        }
    }
}
export const logoutTC = () => {
    return async (dispatch: any) => {
        let responce = await authAPI.logout()
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}


export const getCapchaUrlTC = () => {
    return async (dispatch: any) => {
        const responce = await secirityAPI.getCaptchaUrl()
        const capchaURL = responce.data.url
        dispatch(getCaptchaUrlAC(capchaURL))
    }
}