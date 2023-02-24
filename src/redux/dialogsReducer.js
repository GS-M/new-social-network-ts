
const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Nikolay' },
        { id: 2, name: 'Nikolay 2' },
        { id: 3, name: 'Nikolay 3' },
        { id: 4, name: 'Nikolay 4' },
        { id: 5, name: 'Nikolay 5' }
    ],
    messagesData: [
        { id: 1, message: 'Hi hi' },
        { id: 2, message: 'Hallow' },
        { id: 3, message: 'yoyo' },
        { id: 4, message: 'Arigaaato' },

    ],
}
export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state, messagesData: [...state.messagesData, {
                    id: 6,
                    message: body
                }]
            }

        default:
            return state;
    }
}

export const sendMessageAC = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })
