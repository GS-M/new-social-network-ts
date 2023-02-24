
export const getProfileSR = (state) => {
    return state.profilePage.profile
}
export const getStatusSR = (state) => {
    return state.profilePage.status
}
export const getMyUserIdSR = (state) => {
    return state.auth.id
}
export const getIsAuthSR = (state) => {
    return state.auth.isAuth
}



