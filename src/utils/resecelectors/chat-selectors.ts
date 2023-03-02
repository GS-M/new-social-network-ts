import { GlobalStateType } from "../../redux/redux-store"

export const selectMessages = (state: GlobalStateType) => {
    return state.chat.messages
}
export const selectStatus = (state: GlobalStateType) => {
    return state.chat.status
}



