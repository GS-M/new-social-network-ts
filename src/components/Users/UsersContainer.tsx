import { connect } from "react-redux";
import { getUsersThunkCreator, followTC, unfollowTC } from "../../redux/usersReduser"
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
//import { withAuthRedirectHOC } from "../../hoc/authRedirect";
import { compose } from "redux";
import {
    getCurentPage, getFolowingInProgress, getIsLoading, getPageSize,
    getTotalUsersCount, getUsersSelector
} from "../../utils/resecelectors/users-selectors";
import { UserType } from "../../common-types/common-types";
import { GlobalStateType } from "../../redux/redux-store";

type mapStatePropsType = {
    curentPage: number
    pageSize: number
    users: Array<UserType>
    totalUsersCount: number
    isLoading: boolean
    folowingInProgress: Array<number>
}
type mapDispatchPropsType = {
    getUsersThunkCreator: (curentPage: number, pageSize: number) => void
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
}
type ownPropsType = {
    // Прямые props из компоненты выше
}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

export class UsersAPIComponent extends React.Component<propsType> {
    componentDidMount() {
        const { curentPage, pageSize } = this.props //Деструкторизация внутри метода
        if (this.props.users.length === 0) {
            this.props.getUsersThunkCreator(curentPage, pageSize)

            // this.props.toggleIsLoadingAC(true)
            // usersAPI.getUsers(this.props.curentPage, this.props.pageSize).then(data => {
            //     this.props.toggleIsLoadingAC(false)
            //     this.props.setUsersAC(data.items);
            //     this.props.setTotalUsersCountAC(data.totalCount);
            // });
        }
    }
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.curentPage}&count=${this.props.pageSize}`).then(response =>

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)

        // this.props.setCurentPageAC(pageNumber);
        // this.props.toggleIsLoadingAC(true)
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsLoadingAC(false)
        //     this.props.setUsersAC(data.items);
        // })
    }
    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (<>
            {this.props.isLoading ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                curentPage={this.props.curentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                folowingInProgress={this.props.folowingInProgress}

                followTC={this.props.followTC}
                unfollowTC={this.props.unfollowTC}
            />
        </>)
    }
}

let mapStateToProps = (state: GlobalStateType): mapStatePropsType => {
    return {
        //users: getUsers(state),
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        curentPage: getCurentPage(state),
        isLoading: getIsLoading(state),
        folowingInProgress: getFolowingInProgress(state)
    }
}
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export let UsersContainer = compose(
    connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, GlobalStateType>
        (mapStateToProps, { getUsersThunkCreator, followTC, unfollowTC })
)(UsersAPIComponent)
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