import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { authReducer } from "./authReduser";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";
import { usersReducer } from "./usersReduser";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./appReduser";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

type reducersType = typeof reducers
export type globalStateType = ReturnType<reducersType>  // Определяет тип, возврощаемый из типа

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  //для расширения Redux DevTools

export const store = legacy_createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// export let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.__store__ = store

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
