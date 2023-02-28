import { createSelector } from "reselect"
import { GlobalStateType } from "../../redux/redux-store"


export const getUsers = (state: GlobalStateType) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
}) // усложненный пример

export const getPageSize = (state: GlobalStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: GlobalStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurentPage = (state: GlobalStateType) => {
    return state.usersPage.curentPage
}
export const getIsLoading = (state: GlobalStateType) => {
    return state.usersPage.isLoading
}
export const getFolowingInProgress = (state: GlobalStateType) => {
    return state.usersPage.folowingInProgress
}
export const getUsersFilter = (state: GlobalStateType) => {
    return state.usersPage.filter
}


