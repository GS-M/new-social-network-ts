import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

let mapStateToPropsForRedirect = (state) => { return { isAuth: state.auth.isAuth } }

export const withAuthRedirectHOC = (Component) => {
    let RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to={'/login'} />
        return <Component {...props} />
    }
    let ConnectedWithAuthRedirectHOC = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedWithAuthRedirectHOC
}


