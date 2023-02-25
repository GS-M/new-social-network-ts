import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodeCapchaEnum, ResultCodeEnum, secirityAPI } from "../api/api";
import { GlobalStateType } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

// export type InitialStateType = {
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
export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = setAuthUserDataActionType | getCaptchaUrlActionType

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


type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsType>

export const getAuthUserDataTC = (): ThunkType => {
    return async (dispatch: any) => {
        let data = await authAPI.setUserData()
        if (data.resultCode === ResultCodeEnum.Success) { //Залогинен ли?
            let { id, email, login } = data.data
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {      //any
    return async (dispatch: any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserDataTC())
        } else {
            if (data.resultCode === ResultCodeCapchaEnum.CapchaIsRequired) {
                dispatch(getCapchaUrlTC())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }));
        }
    }
}
export const logoutTC = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}
export const getCapchaUrlTC = (): ThunkType => {
    return async (dispatch) => {
        const responce = await secirityAPI.getCaptchaUrl()
        debugger
        const capchaURL = responce.data.url
        dispatch(getCaptchaUrlAC(capchaURL))
    }
}