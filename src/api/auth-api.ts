import { DefaultResponceType, instance, ResultCodeCapchaEnum, ResultCodeEnum } from "./api"

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

export const authAPI = {
    setUserData() {
        return instance.get<SetUserDataType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<DefaultResponceType>(`auth/login`).then(res => res.data)
    }
}