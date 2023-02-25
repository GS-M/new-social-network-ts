import { instance } from "./api"

type GetCaptchaUrlType = {
    url: string
}
export const secirityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`).then(responce => responce.data)
    },
}