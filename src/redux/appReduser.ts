import { getAuthUserDataTC } from "./authReduser";
import { InferActionsType } from "./redux-store";

const SET_INITIALISED = 'app/SET_INITIALISED';

let initialState = {
    initialised: false,
}
export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALISED:
            return {
                ...state,
                initialised: true
            }

        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setInitialisedAC: () => ({ type: SET_INITIALISED } as const)
}

//type thunkType =ThunkAction<Promise<void>, globalStateType, unknown, actionsType>
export const initialiseAppTC = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserDataTC())

        Promise.all([promise])
            .then(() => {
                dispatch(actions.setInitialisedAC())
            })

    }
}

