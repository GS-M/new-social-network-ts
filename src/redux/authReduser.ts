import { stopSubmit } from "redux-form";
import { ResultCodeCapchaEnum, ResultCodeEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { secirityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsType } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isLoading: false,
    captchaUrl: null as string | null //если Null то каптча не обязательна
}
export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setAuthUserDataAC: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, data: { id, email, login, isAuth }
    } as const),
    getCaptchaUrlAC: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL, captchaUrl } as const)
}


type ThunkType = BaseThunkType<ActionsTypes>
//type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
export const getAuthUserDataTC = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.setUserData()
        if (data.resultCode === ResultCodeEnum.Success) { //Залогинен ли?
            let { id, email, login } = data.data
            dispatch(actions.setAuthUserDataAC(id, email, login, true))
        }
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
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
            dispatch(actions.setAuthUserDataAC(null, null, null, false))
        }
    }
}
export const getCapchaUrlTC = (): ThunkType => {
    return async (dispatch) => {
        const data = await secirityAPI.getCaptchaUrl()
        const capchaURL = data.url
        dispatch(actions.getCaptchaUrlAC(capchaURL))
    }
}