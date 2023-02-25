import { DialogsDataType, MessagesDataType } from "../common-types/common-types";

const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Nikolay' },
        { id: 2, name: 'Nikolay 2' },
        { id: 3, name: 'Nikolay 3' },
        { id: 4, name: 'Nikolay 4' },
        { id: 5, name: 'Nikolay 5' }
    ] as Array<DialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hi hi' },
        { id: 2, message: 'Hallow' },
        { id: 3, message: 'yoyo' },
        { id: 4, message: 'Arigaaato' },
    ] as Array<MessagesDataType>,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: SendMessageActionType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {
                    id: 6,
                    message: action.newMessageBody
                }]
            }

        default:
            return state;
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageAC = (newMessageBody: string):
    SendMessageActionType => ({ type: SEND_MESSAGE, newMessageBody })
