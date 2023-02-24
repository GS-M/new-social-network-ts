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

export class UsersAPIComponent extends React.Component {

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

    onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
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

export let UsersContainer = compose(connect(mapStateToProps, { getUsersThunkCreator, followTC, unfollowTC })
)(UsersAPIComponent)
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
//         unfollowUser: (userId) => { dispatch(unfollowAC(userId)) },
//         setUsers: (users) => { dispatch(setUsersAC(users)) },
//         setCurentPage: (pageNumber) => { dispatch(setCurentPageAC(pageNumber)) },
//         setTotalUsersCount: (totalCount) => { dispatch(setTotalUsersCountAC(totalCount)) },
//         toggleIsLoading: (isLoading) => { dispatch(toggleIsLoadingAC(isLoading)) },
//     }
// }