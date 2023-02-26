import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { GlobalStateType } from '../../../redux/redux-store';
import MyPosts, { MyPostsMapDispatchType, MyPostsMapStateType } from './MyPosts';

let mapStateToProps = (state: GlobalStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const MyPostsContainer = connect<MyPostsMapStateType, MyPostsMapDispatchType, {}, GlobalStateType>
    (mapStateToProps, { addPost: actions.addPostActionCreator })(MyPosts)
export default MyPostsContainer;