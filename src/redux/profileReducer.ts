import { stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { PhotosType, PostsDataType, ProfileType } from "../common-types/common-types";
import { BaseThunkType, InferActionsType } from "./redux-store";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, message: 'First post', likesCount: 3 },
        { id: 2, message: 'Second post', likesCount: 28 }
    ] as Array<PostsDataType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState
export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            return { ...state, profile: { ...state.profile, photos: action.photo } as ProfileType } ////
        default:
            return state
    }
}

type ActionsType = InferActionsType<typeof actions>
export const actions = {
    addPostActionCreator: (newPost: string) => ({ type: ADD_POST, newPost } as const),
    setUserProfileAC: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setUserStatusAC: (status: string) => ({ type: SET_USER_STATUS, status } as const),
    deletePostAC: (postId: number) => ({ type: DELETE_POST, postId } as const),
    savePhotoSuccessAC: (photo: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photo } as const),
}

type ThunkType = BaseThunkType<ActionsType>
export const getUserProfileTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId)
        dispatch(actions.setUserProfileAC(data))
    }
}
export const setUserStatusTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setUserStatusAC(data))
    }
}
export const updateUserStatusTC = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setUserStatusAC(status))
        }
    }
}
export const savePhotoTC = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.savePhotoSuccessAC(data.data.photos))
        }
    }
}
export const saveProfileTC = (profile: ProfileType): ThunkType => {
    return async (dispatch: any, getState: any) => {                      ///////////
        const userId = getState().auth.id
        let data = await profileAPI.saveProfile(profile)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getUserProfileTC(userId))
        } else {
            dispatch(stopSubmit('profileData', { _error: data.messages[0] }));
        }
    }
}

