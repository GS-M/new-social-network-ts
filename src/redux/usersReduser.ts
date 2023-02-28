import { Dispatch } from "redux";
import { ResultCodeEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { UserType } from "../common-types/common-types";
import { updateObjectInArrey } from "../utils/validators/function-helpers";
import { BaseThunkType, GlobalStateType, InferActionsType } from "./redux-store";

const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURENT_PAGE = 'user/SET_CURENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'user/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING = 'user/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'user/TOGGLE_IS_FOLOWING_PROGRESS';
const SET_FILTER = 'user/SET_FILTER'

// export type initialStateType = {
//     users: Array<userType>,
//     pageSize: number,
//     totalUsersCount: number,
//     curentPage: number,
//     isLoading: boolean,
//     folowingInProgress: Array<number>
// }
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 8,
    totalUsersCount: 0,
    curentPage: 1,
    isLoading: false,
    folowingInProgress: [] as Array<number>, //Массив id пользователей
    filter: {
        term: ''
    }
}
export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
                ...state,
                folowingInProgress: action.isLoading === true
                    ? [...state.folowingInProgress, action.userId]
                    : state.folowingInProgress.filter(id => id !== action.userId)
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}


type ActionsType = InferActionsType<typeof actions>
export const actions = {
    followAC: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowAC: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsersAC: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setCurentPageAC: (curentPage: number) => ({ type: SET_CURENT_PAGE, curentPage } as const),
    setTotalUsersCountAC: (totalUsersCount: number) =>
        ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const),
    toggleIsLoadingAC: (isLoading: boolean) => ({ type: TOGGLE_IS_LOADING, isLoading } as const),
    toggleIsFolowingProgressAC: (isLoading: boolean, userId: number) =>
        ({ type: TOGGLE_IS_FOLOWING_PROGRESS, isLoading, userId } as const),
    setFilterAC: (term: string) => ({ type: SET_FILTER, payload: { term } } as const)
}

type ThunkType = BaseThunkType<ActionsType>
export const getUsersThunkCreator = (curentPage: number, pageSize: number, term: string) => {
    return async (dispatch: Dispatch<ActionsType>, getState: () => GlobalStateType) => {        // Можно и так
        dispatch(actions.toggleIsLoadingAC(true))
        let data = await usersAPI.getUsers(curentPage, pageSize, term)
        dispatch(actions.setCurentPageAC(curentPage))
        dispatch(actions.setFilterAC(term))
        dispatch(actions.toggleIsLoadingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }
}
export const followTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.followAC(userId))
        }
        dispatch(actions.toggleIsFolowingProgressAC(false, userId))
    }
}
export const unfollowTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.unfollowAC(userId))
        }
        dispatch(actions.toggleIsFolowingProgressAC(false, userId))
    }
}
