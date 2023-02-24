import { createSelector } from "reselect"


export const getUsers = (state) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
}) // усложненный пример

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurentPage = (state) => {
    return state.usersPage.curentPage
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}
export const getFolowingInProgress = (state) => {
    return state.usersPage.folowingInProgress
}


