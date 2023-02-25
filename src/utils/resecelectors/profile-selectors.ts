import { GlobalStateType } from "../../redux/redux-store"

export const getProfileSR = (state: GlobalStateType) => {
    return state.profilePage.profile
}
export const getStatusSR = (state: GlobalStateType) => {
    return state.profilePage.status
}
export const getMyUserIdSR = (state: GlobalStateType) => {
    return state.auth.id
}
export const getIsAuthSR = (state: GlobalStateType) => {
    return state.auth.isAuth
}



