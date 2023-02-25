import { getAuthUserDataTC } from "./authReduser";

const SET_INITIALISED = 'app/SET_INITIALISED';

export type InitialStateType = {
    initialised: boolean,
}

let initialState: InitialStateType = {
    initialised: false,
}

export const appReducer = (state = initialState, action: SetInitialisedACType): InitialStateType => {
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

type SetInitialisedACType = {
    type: typeof SET_INITIALISED
}
export const setInitialisedAC = (): SetInitialisedACType => ({ type: SET_INITIALISED })

//type thunkType =ThunkAction<Promise<void>, globalStateType, unknown, actionsType>
export const initialiseAppTC = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserDataTC())

        Promise.all([promise])
            .then(() => {
                dispatch(setInitialisedAC())
            })

    }
}

