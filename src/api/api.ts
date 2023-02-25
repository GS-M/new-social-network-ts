import axios from "axios";

export const instance = axios.create({
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

export type DefaultResponceType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}






