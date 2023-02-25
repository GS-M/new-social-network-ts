import axios from "axios";
import { ProfileType, UserType } from "../common-types/common-types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCapchaEnum {
    CapchaIsRequired = 10
}


type GetUserstype = {
    items: Array<UserType>
    totalCount: number
    erros: string | null
}
type FollowUnfollowUserType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}
export const usersAPI = {
    getUsers(curentPage = 1, pageSize = 10) {
        return instance.get<GetUserstype>(`users?page=${curentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<FollowUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<FollowUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    }
}


type SetUserDataType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginType = {
    data: {
        id: number
    }
    resultCode: ResultCodeEnum | ResultCodeCapchaEnum
    messages: Array<string>
}
type LogoutType = {
    data: {
        id: number
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type GetCaptchaUrlType = {
    url: string
}
export const authAPI = {
    setUserData() {
        return instance.get<SetUserDataType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutType>(`auth/login`).then(res => res.data)
    }
}
export const secirityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },
}


export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photo: any) { //// any
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put(`profile/photo`, formData)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },

}
