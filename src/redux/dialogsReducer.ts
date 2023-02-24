import { dialogsDataType, messagesDataType } from "../common-types/common-types";

const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

// type dialogsDataType = {
//     id: number,
//     name: string
// }
// type messagesDataType = {
//     id: number,
//     message: string
// }

let initialState = {
    dialogsData: [
        { id: 1, name: 'Nikolay' },
        { id: 2, name: 'Nikolay 2' },
        { id: 3, name: 'Nikolay 3' },
        { id: 4, name: 'Nikolay 4' },
        { id: 5, name: 'Nikolay 5' }
    ] as Array<dialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hi hi' },
        { id: 2, message: 'Hallow' },
        { id: 3, message: 'yoyo' },
        { id: 4, message: 'Arigaaato' },
    ] as Array<messagesDataType>,
}

export type initialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any): initialStateType => {

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

type sendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageAC = (newMessageBody: string):
    sendMessageActionType => ({ type: SEND_MESSAGE, newMessageBody })
