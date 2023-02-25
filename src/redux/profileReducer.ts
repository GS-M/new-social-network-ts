import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { photosType, postsDataType, profileType } from "../common-types/common-types";
import { globalStateType } from "./redux-store";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, message: 'First post', likesCount: 3 },
        { id: 2, message: 'Second post', likesCount: 28 }
    ] as Array<postsDataType>,
    profile: null as profileType | null,
    status: ''
}

export type initialStateType = typeof initialState

export const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, { id: 5, message: action.newPost, likesCount: 0 }]
            }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_USER_STATUS:
            return { ...state, status: action.status }
        case DELETE_POST:
            return { ...state, postsData: state.postsData.filter(p => p.id !== action.postId) }
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photo } as profileType } ////
        default:
            return state
    }
}
///////

type actionsType = addPostActionType | setUserProfileActiontype | setUserStatusActionType |
    deletePostActionType | savePhotoSuccessActionType

type addPostActionType = {
    type: typeof ADD_POST
    newPost: string
}
export const addPostActionCreator = (newPost: string): addPostActionType => ({ type: ADD_POST, newPost })

type setUserProfileActiontype = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}
export const setUserProfileAC = (profile: profileType): setUserProfileActiontype => ({ type: SET_USER_PROFILE, profile })

type setUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatusAC = (status: string): setUserStatusActionType => ({ type: SET_USER_STATUS, status })

type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePostAC = (postId: number): deletePostActionType => ({ type: DELETE_POST, postId })

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photo: photosType
}
export const savePhotoSuccessAC = (photo: photosType): savePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photo })

type thunkType = ThunkAction<Promise<void>, globalStateType, unknown, actionsType>

export const getUserProfileTC = (userId: number): thunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileAC(data))
    }
}
export const setUserStatusTC = (userId: number): thunkType => {
    return async (dispatch) => {
        let responce = await profileAPI.getStatus(userId)
        dispatch(setUserStatusAC(responce.data))
    }
}
export const updateUserStatusTC = (status: string): thunkType => {
    return async (dispatch) => {
        let responce = await profileAPI.updateStatus(status)
        if (responce.data.resultCode === 0) {
            dispatch(setUserStatusAC(status))
        }
    }
}
export const savePhotoTC = (file: any): thunkType => {                     /////////////
    return async (dispatch) => {
        let responce = await profileAPI.savePhoto(file)
        if (responce.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(responce.data.data.photos))
        }
    }
}
export const saveProfileTC = (profile: profileType): thunkType => {
    return async (dispatch: any, getState: any) => {                      ///////////
        const userId = getState().auth.id
        let responce = await profileAPI.saveProfile(profile)
        if (responce.data.resultCode === 0) {
            dispatch(getUserProfileTC(userId))
        } else {
            dispatch(stopSubmit('profileData', { _error: responce.data.messages[0] }));
        }
    }
}

