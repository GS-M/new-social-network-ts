import axios from "axios";
import { profileType, userType } from "../common-types/common-types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export enum resultCodeEnum {
    Success = 0,
    Error = 1
}
export enum resultCodeCapchaEnum {
    CapchaIsRequired = 10
}


type getUserstype = {
    items: Array<userType>
    totalCount: number
    erros: string | null
}
type followUnfollowUserType = {
    data: {}
    resultCode: resultCodeEnum
    messages: Array<string>
}
export const usersAPI = {
    getUsers(curentPage = 1, pageSize = 10) {
        return instance.get<getUserstype>(`users?page=${curentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<followUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<followUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    }
}


type setUserDataType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: resultCodeEnum
    messages: Array<string>
}
type loginType = {
    data: {
        id: number
    }
    resultCode: resultCodeEnum | resultCodeCapchaEnum
    messages: Array<string>
}
type logoutType = {
    data: {
        id: number
    }
    resultCode: resultCodeEnum
    messages: Array<string>
}
type getCaptchaUrl = {
    url: string
}
export const authAPI = {
    setUserData() {
        return instance.get<setUserDataType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<loginType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<logoutType>(`auth/login`).then(res => res.data)
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
    saveProfile(profile: profileType) {
        return instance.put(`profile`, profile)
    },

}
