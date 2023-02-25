import { UserType } from "../common-types/common-types"
import { DefaultResponceType, instance, ResultCodeEnum } from "./api"


type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    erros: string | null
}

export const usersAPI = {
    getUsers(curentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${curentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<DefaultResponceType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<DefaultResponceType>(`follow/${id}`)
            .then(response => response.data)
    }
}