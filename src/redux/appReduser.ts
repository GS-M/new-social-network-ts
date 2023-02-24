import { getAuthUserDataTC } from "./authReduser";

const SET_INITIALISED = 'app/SET_INITIALISED';

export type initialStateType = {
    initialised: boolean,
}

let initialState: initialStateType = {
    initialised: false,
}

export const appReducer = (state = initialState, action: any): initialStateType => {
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

type setInitialisedACtype = {
    type: typeof SET_INITIALISED
}
export const setInitialisedAC = (): setInitialisedACtype => ({ type: SET_INITIALISED })

export const initialiseAppTC = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserDataTC())

        Promise.all([promise])
            .then(() => {
                dispatch(setInitialisedAC())
            })

    }
}

