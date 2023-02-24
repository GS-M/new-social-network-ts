import { stopSubmit } from "redux-form";
import { authAPI, secirityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isLoading: false,
    captchaUrl: null //если Null то каптча не обязательна
}
export const authReducer = (state = initialState, action) => {
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

export const setAuthUserDataAC = (id, email, login, isAuth) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })
export const getCaptchaUrlAC = (captchaUrl) => ({ type: GET_CAPTCHA_URL, captchaUrl })

export const getAuthUserDataTC = () => {
    return async (dispatch) => {
        let data = await authAPI.setUserData()
        if (data.resultCode === 0) { //Залогинен ли?
            let { id, email, login } = data.data
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
    }
}

export const logoutTC = () => {
    return async (dispatch) => {
        let responce = await authAPI.logout()
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}
export const loginTC = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
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

export const getCapchaUrlTC = () => {
    return async (dispatch) => {
        const responce = await secirityAPI.getCaptchaUrl()
        const capchaURL = responce.data.url
        dispatch(getCaptchaUrlAC(capchaURL))
    }
}