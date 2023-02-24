import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profileReducer';
//import { StoreContext } from '../../../redux/StoreContext';
import MyPosts from './MyPosts';

// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let addPost = () => {
//                         store.dispatch(addPostActionCreator());
//                     }
//                     let onPostChange = (text) => {
//                         let action = newPostTextActionCreator(text);
//                         store.dispatch(action);
//                     }

//                     return (
//                         <MyPosts
//                             // postsData={props.postsData} newPostText={props.newPostText}
//                             postsData={store.getState().profilePage.postsData}
//                             newPostText={store.getState().profilePage.newPostText}
//                             updateNewPostText={onPostChange}
//                             addPost={addPost} />
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => { dispatch(addPostActionCreator(newPostText)) }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;