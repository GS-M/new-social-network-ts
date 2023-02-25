import { PhotosType, ProfileType } from "../common-types/common-types"
import { DefaultResponceType, instance, ResultCodeEnum } from "./api"

type SavePhotoType = {
    data: SavePhotoHelperType
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type SavePhotoHelperType = {
    photos: PhotosType
}
export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<DefaultResponceType>(`profile/status`, { status: status })
            .then(response => response.data)
    },
    savePhoto(photo: File) { //// any
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put<SavePhotoType>(`profile/photo`, formData)
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<DefaultResponceType>(`profile`, profile).then(response => response.data)
    }
}
