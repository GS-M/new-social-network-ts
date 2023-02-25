import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, resultCodeCapchaEnum, resultCodeEnum, secirityAPI } from "../api/api";
import { globalStateType } from "./redux-store";

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

export const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
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

type actionsType = setAuthUserDataActionType | getCaptchaUrlActionType

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


type thunkType = ThunkAction<Promise<void>, globalStateType, unknown, actionsType>

export const getAuthUserDataTC = (): thunkType => {
    return async (dispatch: any) => {
        let data = await authAPI.setUserData()
        if (data.resultCode === resultCodeEnum.Success) { //Залогинен ли?
            let { id, email, login } = data.data
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any): thunkType => {      //any
    return async (dispatch: any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === resultCodeEnum.Success) {
            dispatch(getAuthUserDataTC())
        } else {
            if (data.resultCode === resultCodeCapchaEnum.CapchaIsRequired) {
                dispatch(getCapchaUrlTC())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }));
        }
    }
}
export const logoutTC = (): thunkType => {
    return async (dispatch) => {
        let responce = await authAPI.logout()
        if (responce.data.resultCode === resultCodeEnum.Success) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}
export const getCapchaUrlTC = (): thunkType => {
    return async (dispatch) => {
        const responce = await secirityAPI.getCaptchaUrl()
        const capchaURL = responce.data.url
        dispatch(getCaptchaUrlAC(capchaURL))
    }
}