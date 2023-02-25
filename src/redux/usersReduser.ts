import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { resultCodeEnum, usersAPI } from "../api/api";
import { userType } from "../common-types/common-types";
import { updateObjectInArrey } from "../utils/validators/function-helpers";
import { globalStateType, InferActionsType } from "./redux-store";

const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURENT_PAGE = 'user/SET_CURENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'user/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING = 'user/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLOWING_PROGRESS = 'user/TOGGLE_IS_FOLOWING_PROGRESS';

// export type initialStateType = {
//     users: Array<userType>,
//     pageSize: number,
//     totalUsersCount: number,
//     curentPage: number,
//     isLoading: boolean,
//     folowingInProgress: Array<number>
// }
export type initialStateType = typeof initialState

let initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    totalUsersCount: 0,
    curentPage: 1,
    isLoading: false,
    folowingInProgress: [] as Array<number> //Массив id пользователей
}
export const usersReducer = (state = initialState, action: actionsTypes): initialStateType => {

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
        default:
            return state;
    }
}


type actionsTypes = InferActionsType<typeof actions>
export const actions = {
    followAC: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowAC: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsersAC: (users: Array<userType>) => ({ type: SET_USERS, users } as const),
    setCurentPageAC: (curentPage: number) => ({ type: SET_CURENT_PAGE, curentPage } as const),
    setTotalUsersCountAC: (totalUsersCount: number) =>
        ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const),
    toggleIsLoadingAC: (isLoading: boolean) => ({ type: TOGGLE_IS_LOADING, isLoading } as const),
    toggleIsFolowingProgressAC: (isLoading: boolean, userId: number) =>
        ({ type: TOGGLE_IS_FOLOWING_PROGRESS, isLoading, userId } as const)
}

type getStateType = () => globalStateType
type dispatchType = Dispatch<actionsTypes>
type thunkType = ThunkAction<Promise<void>, globalStateType, unknown, actionsTypes>

export const getUsersThunkCreator = (curentPage: number, pageSize: number) => {
    return async (dispatch: dispatchType, getState: getStateType) => {            // Можно и так
        dispatch(actions.toggleIsLoadingAC(true))
        let data = await usersAPI.getUsers(curentPage, pageSize)
        dispatch(actions.setCurentPageAC(curentPage))
        dispatch(actions.toggleIsLoadingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }
}

export const followTC = (userId: number): thunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.followUser(userId)
        //debugger
        if (data.resultCode === resultCodeEnum.Success) {
            dispatch(actions.followAC(userId))
        }
        dispatch(actions.toggleIsFolowingProgressAC(false, userId))
    }
}

export const unfollowTC = (userId: number): thunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFolowingProgressAC(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === resultCodeEnum.Success) {
            dispatch(actions.unfollowAC(userId))
        }
        dispatch(actions.toggleIsFolowingProgressAC(false, userId))
    }
}
