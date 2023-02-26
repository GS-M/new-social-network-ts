import { Action, applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { authReducer } from "./authReduser";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { sidebarReducer } from "./sidebarReducer";
import { usersReducer } from "./usersReduser";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
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


type ReducersType = typeof reducers
export type GlobalStateType = ReturnType<ReducersType>  // Определяет тип, возврощаемый из типа

// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, GlobalStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  //для расширения Redux DevTools
export const store = legacy_createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
// export let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.__store__ = store
