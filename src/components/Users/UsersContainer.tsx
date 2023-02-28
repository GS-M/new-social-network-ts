import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
//import { withAuthRedirectHOC } from "../../hoc/authRedirect";
import { getIsLoading } from "../../utils/resecelectors/users-selectors";
import { useSelector } from "react-redux";

type UsersPagePropsType = {}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isLoading = useSelector(getIsLoading)
    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <Users />
        </div>
    )
}
    // type mapStatePropsType = {
    //     curentPage: number
    //     pageSize: number
    //     users: Array<UserType>
    //     totalUsersCount: number
    //     isLoading: boolean
    //     folowingInProgress: Array<number>,
    //     filter: FilterType
    // }

    // type ownPropsType = {
    // Прямые props из компоненты выше

    // type mapDispatchPropsType = {
    //     getUsersThunkCreator: (curentPage: number, pageSize: number, filter: FilterType) => void
    //     followTC: (userId: number) => void
    //     unfollowTC: (userId: number) => void
    // }
    // type PropsType = mapStatePropsType & mapDispatchPropsType & ownPropsType
// }
// export class UsersAPIComponent extends React.Component<PropsType> {
//     componentDidMount() {
//         //const { curentPage, pageSize } = this.props //Деструкторизация внутри метода
//         if (this.props.users.length === 0) {
//             this.props.getUsersThunkCreator(this.props.curentPage, this.props.pageSize, this.props.filter)
//         }
//     }
//     // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.curentPage}&count=${this.props.pageSize}`).then(response =>

//     onPageChanged = (pageNumber: number) => {
//         this.props.getUsersThunkCreator(pageNumber, this.props.pageSize, this.props.filter)

//         // this.props.setCurentPageAC(pageNumber);
//         // this.props.toggleIsLoadingAC(true)
//         // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
//         //     this.props.toggleIsLoadingAC(false)
//         //     this.props.setUsersAC(data.items);
//         // })
//     }
//     onFilterChanged = (filter: FilterType) => {
//         this.props.getUsersThunkCreator(1, this.props.pageSize, filter)
//     }
//     render() {
//         let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
//         let pages = [];
//         for (let i = 1; i <= pagesCount; i++) {
//             pages.push(i)
//         }
//         return (<>
//             {this.props.isLoading ? <Preloader /> : null}
//             <Users

//                 folowingInProgress={this.props.folowingInProgress}


//                 followTC={this.props.followTC}
//                 unfollowTC={this.props.unfollowTC}
//             />
//         </>)
//     }
// }

// let mapStateToProps = (state: GlobalStateType): mapStatePropsType => {
//     return {
//         //users: getUsers(state),
//         users: getUsersSelector(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         curentPage: getCurentPage(state),
//         isLoading: getIsLoading(state),
//         folowingInProgress: getFolowingInProgress(state),
//         filter: getUsersFilter(state)
//     }
// }
// //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
// export let UsersContainer = compose(
//     connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, GlobalStateType>
//         (mapStateToProps, { getUsersThunkCreator, followTC, unfollowTC })
// )(UsersAPIComponent)
//<propsType>
    //withAuthRedirectHOC
// export let UsersContainer = connect(mapStateToProps, {
//     // followUser: followAC, По такому принципу
//     // unfollowAC,
//     getUsersThunkCreator, followTC, unfollowTC
// })(withRedirect);
// Раньше было так
// let mapDispatchToProps = (dispatch) => {
//     return {
//         followUser: (userId) => { dispatch(followAC(userId)) },
//     }
// }