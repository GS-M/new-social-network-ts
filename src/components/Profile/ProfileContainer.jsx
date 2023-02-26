//import axios from 'axios';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfileTC, setUserStatusTC, updateUserStatusTC, savePhotoTC, saveProfileTC } from '../../redux/profileReducer';
import { useParams, } from "react-router-dom";
import { withAuthRedirectHOC } from '../../hoc/authRedirect';
import { compose } from 'redux';
import { getIsAuthSR, getMyUserIdSR, getProfileSR, getStatusSR } from '../../utils/resecelectors/profile-selectors';


/*
type MapStatePropsType={
   profile: ProfileType
    status: string
     myUserID:  number
    isAuth: boolean
}
type MapDispatchPropsType={
    getUserProfileTC :(currentId: number)=>void
     setUserStatusTC:(currentId: number)=>void
     updateUserStatusTC:()=>void
      savePhotoTC()=>void
      saveProfileTC()=>void
}

React.FC<MapStatePropsType&MapDispatchPropsType& RouteComponentProps<PathParamsType>
*/

const ProfileApiComponent = (props) => {
    let params = useParams()
    let userCurrentID = params.userId
    if (!params.userId) {
        userCurrentID = props.myUserID
    }

    useEffect(() => {
        props.getUserProfileTC(userCurrentID)
        props.setUserStatusTC(userCurrentID)
    }, [userCurrentID])
    // [params]
    // [params.userId]
    // [props] - крашит
    // [props, userCurrentID]) -крашит
    return (
        <Profile profile={props.profile} status={props.status}
            updateUserStatusTC={props.updateUserStatusTC}
            isOwner={!params.userId} savePhotoTC={props.savePhotoTC}
            saveProfileTC={props.saveProfileTC} />
    )
}
let mapStateToProps = (state) => ({
    profile: getProfileSR(state),
    status: getStatusSR(state),
    myUserID: getMyUserIdSR(state),
    isAuth: getIsAuthSR(state)
})

const ProfileContainer = compose(connect(mapStateToProps, {
    getUserProfileTC, setUserStatusTC, updateUserStatusTC, savePhotoTC, saveProfileTC
}),
    withAuthRedirectHOC)(ProfileApiComponent)
export default ProfileContainer
/*
type PathParamsType={
    userId: string
}
*/
////
// const ProfileApiComponent = (props) => {
//     let params = useParams()
//     let userCurrentID = params.userId
//     if (!params.userId) {
//         userCurrentID = props.myUserID
//         // params.userId = props.myUserID // (мой id)
//     }

//     useEffect(() => {
//         // props.getUserProfileTC(params.userId)
//         // props.setUserStatusTC(params.userId)
//         props.getUserProfileTC(userCurrentID)
//         props.setUserStatusTC(userCurrentID)

//         // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${params.userId}`).then(response => {
//         //     props.setUserProfileAC(response.data)
//         //})
//     }, [userCurrentID])
//     // [params]
//     // [params.userId]
//     // [props] - крашит

//     // if (!props.isAuth) {
//     //     return <Navigate to={'/login'} />
//     // }
//     // теперь HOC

//     return (
//         <Profile profile={props.profile} status={props.status}
//             updateUserStatusTC={props.updateUserStatusTC}
//             isOwner={!params.userId} savePhotoTC={props.savePhotoTC}
//             saveProfileTC={props.saveProfileTC} />
//     )
// }
// let mapStateToProps = (state) => ({
//     // profile: state.profilePage.profile,
//     profile: getProfileSR(state),
//     status: getStatusSR(state),
//     myUserID: getMyUserIdSR(state),
//     isAuth: getIsAuthSR(state)
// })

// const ProfileContainer = compose(connect(mapStateToProps, {
//     getUserProfileTC, setUserStatusTC, updateUserStatusTC, savePhotoTC, saveProfileTC
// }),
//     withAuthRedirectHOC)(ProfileApiComponent)
// export default ProfileContainer

// let RedirectComponentAuth = withAuthRedirectHOC(ProfileApiComponent)
// export default connect(mapStateToProps, { getUserProfileTC })(RedirectComponentAuth)

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{ location, navigate, params }}
//             />
//         );
//     }
//     return ComponentWithRouterProp;
// }

// class ProfileContainer extends React.Component {
//     componentDidMount() {
//         debugger
//         let userId = this.props.router.params.userId;
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
//             this.props.setUserProfileAC(response.data)
//         })
//     }

//     render() {
//         return (<Profile {...this.props} profile={this.props.profile} />)
//     }
// }
// class ProfileContainer extends React.Component {
//     componentDidMount() {
//         debugger
//         let userId = this.props.router.params.userId;
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
//             this.props.setUserProfileAC(response.data)
//         })
//     }

//     render() {
//         return (<Profile {...this.props} profile={this.props.profile} />)
//     }
// }
