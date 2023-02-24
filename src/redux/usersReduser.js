import { usersAPI } from "../api/api";
import { updateObjectInArrey } from "../utils/validators/function-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURENT_PAGE = 'SET_CURENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'TOGGLE_IS_FOLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 8,
    totalUsersCount: 0,
    curentPage: 1,
    isLoading: false,
    folowingInProgress: [],
}
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArrey(state.users, action.userId, 'id', { followed: true })
                //  users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArrey(state.users, action.userId, 'id', { followed: false })
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u
                // })
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURENT_PAGE:
            return { ...state, curentPage: action.curentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case TOGGLE_IS_FOLOWING_PROGRESS:
            return {
                ...state, folowingInProgress: action.isLoading === true
                    ? [...state.folowingInProgress, action.userId]
                    : [state.folowingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurentPageAC = (curentPage) => ({ type: SET_CURENT_PAGE, curentPage })
export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsLoadingAC = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const toggleIsFolowingProgressAC = (isLoading, userId) => ({ type: TOGGLE_IS_FOLOWING_PROGRESS, isLoading, userId })

export const getUsersThunkCreator = (curentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsLoadingAC(true))
        let data = await usersAPI.getUsers(curentPage, pageSize)
        dispatch(setCurentPageAC(curentPage))
        dispatch(toggleIsLoadingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))

    }
}

export const followTC = (userId) => {
    return async (dispatch) => {
        dispatch(toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(followAC(userId))
        }
        dispatch(toggleIsFolowingProgressAC(false, userId))
    }
}

export const unfollowTC = (userId) => {
    return async (dispatch) => {
        dispatch(toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowAC(userId))
        }
        dispatch(toggleIsFolowingProgressAC(false, userId))
    }
}
