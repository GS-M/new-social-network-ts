// Раньше пользовался своим стором

import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";

export let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi, how are u', likesCount: 3 },
                { id: 2, message: 'First post', likesCount: 28 }
            ],
            newPostText: ''
        },
        dialogsPage: {
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
            newMessageBody: ''
        },
        sidebarPage: {}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

        this._callSubscriber();
    }
}

window.store = store;

