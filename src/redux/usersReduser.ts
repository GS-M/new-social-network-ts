import { usersAPI } from "../api/api";
import { photosType, userType } from "../common-types/common-types";
import { updateObjectInArrey } from "../utils/validators/function-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURENT_PAGE = 'SET_CURENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'TOGGLE_IS_FOLOWING_PROGRESS';

export type initialStateType = {
    users: Array<userType>,
    pageSize: number,
    totalUsersCount: number,
    curentPage: number,
    isLoading: boolean,
    folowingInProgress: Array<number>
}


let initialState: initialStateType = {
    users: [],
    pageSize: 8,
    totalUsersCount: 0,
    curentPage: 1,
    isLoading: false,
    folowingInProgress: [],  //Массив id пользователей
}
export const usersReducer = (state = initialState, action: any): initialStateType => {
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


type followActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): followActionType => ({ type: FOLLOW, userId })

type unfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): unfollowActionType => ({ type: UNFOLLOW, userId })

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}
export const setUsersAC = (users: Array<userType>): setUsersActionType => ({ type: SET_USERS, users })

type setCurentPageAction = {
    type: typeof SET_CURENT_PAGE
    curentPage: number
}
export const setCurentPageAC = (curentPage: number): setCurentPageAction => ({ type: SET_CURENT_PAGE, curentPage })

type setTotalUsersCountActiontype = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCountAC = (totalUsersCount: number):
    setTotalUsersCountActiontype => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type toggleIsLoadingActiontype = {
    type: typeof TOGGLE_IS_LOADING
    isLoading: boolean
}
export const toggleIsLoadingAC = (isLoading: boolean): toggleIsLoadingActiontype => ({ type: TOGGLE_IS_LOADING, isLoading })

type toggleIsFolowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLOWING_PROGRESS
    isLoading: boolean
    userId: number
}
export const toggleIsFolowingProgressAC = (isLoading: boolean, userId: number):
    toggleIsFolowingProgressActionType => ({ type: TOGGLE_IS_FOLOWING_PROGRESS, isLoading, userId })


export const getUsersThunkCreator = (curentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsLoadingAC(true))
        let data = await usersAPI.getUsers(curentPage, pageSize)
        dispatch(setCurentPageAC(curentPage))
        dispatch(toggleIsLoadingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))

    }
}

export const followTC = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(followAC(userId))
        }
        dispatch(toggleIsFolowingProgressAC(false, userId))
    }
}

export const unfollowTC = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowAC(userId))
        }
        dispatch(toggleIsFolowingProgressAC(false, userId))
    }
}
