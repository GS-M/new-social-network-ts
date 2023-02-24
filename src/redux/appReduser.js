import { getAuthUserDataTC } from "./authReduser";

const SET_INITIALISED = 'app/SET_INITIALISED';


let initialState = {
    initialised: false,
}
export const appReducer = (state = initialState, action) => {

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

export const setInitialisedAC = () => ({ type: SET_INITIALISED })

export const initialiseAppTC = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserDataTC())

        Promise.all([promise])
            .then(() => { 
                dispatch(setInitialisedAC())
            })

    }
}

