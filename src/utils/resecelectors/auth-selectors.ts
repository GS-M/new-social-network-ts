import { GlobalStateType } from "../../redux/redux-store"

export const getCaptchaUrl = (state: GlobalStateType) => {
    return state.auth.captchaUrl
}


