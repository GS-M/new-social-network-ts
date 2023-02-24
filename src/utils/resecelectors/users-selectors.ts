import { createSelector } from "reselect"
import { globalStateType } from "../../redux/redux-store"


export const getUsers = (state: globalStateType) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
}) // усложненный пример

export const getPageSize = (state: globalStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: globalStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurentPage = (state: globalStateType) => {
    return state.usersPage.curentPage
}
export const getIsLoading = (state: globalStateType) => {
    return state.usersPage.isLoading
}
export const getFolowingInProgress = (state: globalStateType) => {
    return state.usersPage.folowingInProgress
}


