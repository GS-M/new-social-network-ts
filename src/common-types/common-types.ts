export type postsDataType = {
    id: number
    message: string
    likesCount: number
} /* Формат данных для постов */

export type profileType = {
    iuserId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
} /* Все данные профиля */

export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}

export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
} /*Отдельно взятый пользователь */