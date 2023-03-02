import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ResultCodeCapchaEnum, ResultCodeEnum } from "../api/api";
import { chatAPI, ChatMessageType } from "../api/chat-api";

import { BaseThunkType, InferActionsType } from "./redux-store";

const SET_MESSAGES = 'chat/SET_MESSAGES';

let initialState = {
    messages: [] as Array<ChatMessageType>,
}

export type InitialStateType = typeof initialState


export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.data.messages]
            }

        default:
            return state;
    }
}


type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setMessages: (messages: Array<ChatMessageType>) => ({ type: SET_MESSAGES, data: { messages } } as const),
}


let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

type ThunkType = BaseThunkType<ActionsTypes>

export const startMessagesListeningTC = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }
}
export const stopMessagesListeningTC = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    }
}
export const sendMessageTC = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}
