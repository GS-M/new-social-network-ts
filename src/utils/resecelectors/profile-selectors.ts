import { globalStateType } from "../../redux/redux-store"

export const getProfileSR = (state: globalStateType) => {
    return state.profilePage.profile
}
export const getStatusSR = (state: globalStateType) => {
    return state.profilePage.status
}
export const getMyUserIdSR = (state: globalStateType) => {
    return state.auth.id
}
export const getIsAuthSR = (state: globalStateType) => {
    return state.auth.isAuth
}



