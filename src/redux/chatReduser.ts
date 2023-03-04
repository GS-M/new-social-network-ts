import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { v1 } from "uuid";
import { ResultCodeCapchaEnum, ResultCodeEnum } from "../api/api";
import { chatAPI, ChatMessageType, StatusType } from "../api/chat-api";

import { BaseThunkType, InferActionsType } from "./redux-store";

const SET_MESSAGES = 'chat/SET_MESSAGES';
const SET_STATUS_CHANGES = 'chat/SET_STATUS_CHANGES';

type ChatMessageWithIdType = ChatMessageType & { id: string }

let initialState = {
    messages: [] as Array<ChatMessageWithIdType>,
    status: 'ready' as StatusType
}

export type InitialStateType = typeof initialState


export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.data.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case SET_STATUS_CHANGES:
            return {
                ...state,
                status: action.data.status
            }

        default:
            return state;
    }
}


type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setMessagesAC: (messages: Array<ChatMessageType>) => ({ type: SET_MESSAGES, data: { messages } } as const),
    setStatusChangedAC: (status: StatusType) => ({ type: SET_STATUS_CHANGES, data: { status } } as const),
}


let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessagesAC(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatusChangedAC(status))
        }
    }
    return _statusChangedHandler
}

type ThunkType = BaseThunkType<ActionsTypes>

export const startMessagesListeningTC = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}
export const stopMessagesListeningTC = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        chatAPI.stop()
    }
}
export const sendMessageTC = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}
