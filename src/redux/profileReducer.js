import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, message: 'First post', likesCount: 3 },
        { id: 2, message: 'Second post', likesCount: 28 }
    ],
    profile: null,
    status: ''
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = action.newPost;
            return {
                ...state,
                postsData: [...state.postsData, { id: 5, message: body, likesCount: 0 }]
            };

        case SET_USER_PROFILE:

            return { ...state, profile: action.profile };
        case SET_USER_STATUS:
            return { ...state, status: action.status };
        case DELETE_POST:
            return { ...state, postsData: state.postsData.filter(p => p.id !== action.postId) };
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photo } };
        default:
            return state
    }
}

export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost })
export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatusAC = (status) => ({ type: SET_USER_STATUS, status })
export const deletePostAC = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccessAC = (photo) => ({ type: SAVE_PHOTO_SUCCESS, photo })

export const getUserProfileTC = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileAC(data))
    }
}
export const setUserStatusTC = (userId) => {
    return async (dispatch) => {
        let responce = await profileAPI.getStatus(userId)
        dispatch(setUserStatusAC(responce.data))
    }
}
export const updateUserStatusTC = (status) => {
    return async (dispatch) => {
        let responce = await profileAPI.updateStatus(status)
        if (responce.data.resultCode === 0) {
            dispatch(setUserStatusAC(status))
        }
    }
}
export const savePhotoTC = (file) => {
    return async (dispatch) => {
        let responce = await profileAPI.savePhoto(file)
        if (responce.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(responce.data.data.photos))
        }
    }
}
export const saveProfileTC = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        let responce = await profileAPI.saveProfile(profile)
        if (responce.data.resultCode === 0) {
            dispatch(getUserProfileTC(userId))
        } else {
            dispatch(stopSubmit('profileData', { _error: responce.data.messages[0] }));
        }
    }
}

