import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { photosType, postsDataType, profileType } from "../common-types/common-types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

// type postsDataType = {
//     id: number
//     message: string
//     likesCount: number
// }

// type profileType = {
//     iuserId: number
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     fullName: string
//     contacts: contactsType
//     photos: photosType
// }
// type contactsType = {
//     github: string
//     vk: string
//     facebook: string
//     instagram: string
//     twitter: string
//     website: string
//     youtube: string
//     mainLink: string
// }
// type photosType = {
//     small: string | null
//     large: string | null
// }

let initialState = {
    postsData: [
        { id: 1, message: 'First post', likesCount: 3 },
        { id: 2, message: 'Second post', likesCount: 28 }
    ] as Array<postsDataType>,
    profile: null as profileType | null,
    status: ''
}

export type initialStateType = typeof initialState

export const profileReducer = (state = initialState, action: any): initialStateType => {
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


export const getUserProfileTC = (userId: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileAC(data))
    }
}
export const setUserStatusTC = (userId: number) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.getStatus(userId)
        dispatch(setUserStatusAC(responce.data))
    }
}
export const updateUserStatusTC = (status: string) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.updateStatus(status)
        if (responce.data.resultCode === 0) {
            dispatch(setUserStatusAC(status))
        }
    }
}
export const savePhotoTC = (file: any) => {
    return async (dispatch: any) => {
        let responce = await profileAPI.savePhoto(file)
        if (responce.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(responce.data.data.photos))
        }
    }
}
export const saveProfileTC = (profile: profileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.id
        let responce = await profileAPI.saveProfile(profile)
        if (responce.data.resultCode === 0) {
            dispatch(getUserProfileTC(userId))
        } else {
            dispatch(stopSubmit('profileData', { _error: responce.data.messages[0] }));
        }
    }
}

