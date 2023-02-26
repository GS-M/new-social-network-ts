import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { PostsDataType } from '../../../common-types/common-types';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../common/FormsControl/FormsControl';
import cs from './MyPosts.module.css';
import Post from './Post/Post';

type MyPostFormValuesType = {
    newPostText: string
}
type MyPostFormValuesTypeKeys = Extract<keyof MyPostFormValuesType, string>
type MyPostFormOwnPropsType = {
}

const maxLength10 = maxLengthCreator(10)
const NewPostForm: React.FC<InjectedFormProps<MyPostFormValuesType, MyPostFormOwnPropsType> & MyPostFormOwnPropsType>
    = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<MyPostFormValuesTypeKeys>
                        ('Enter your new post', Textarea, 'newPostText', [requiredField, maxLength10])}
                    {/* <Field component={Textarea} placeholder={'Enter your new post'} name={'newPostText'}
                        validate={[requiredField, maxLength10]} /> */}
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        )
    }
const NewPostReduxForm = reduxForm<MyPostFormValuesType, MyPostFormOwnPropsType>({ form: 'addNewPostText' })(NewPostForm)


export type MyPostsMapStateType = {
    postsData: Array<PostsDataType>
}
export type MyPostsMapDispatchType = {
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<MyPostsMapStateType & MyPostsMapDispatchType> = React.memo((props) => {

    let postElements =
        [...props.postsData] // Работаю с копией(иммутабельность)
            .reverse().map((posts) => <Post key={posts.id} message={posts.message} likesCount={posts.likesCount} />)

    let addNewPost = (values: MyPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={cs.myPost}>
            <h3>My post</h3>
            <NewPostReduxForm onSubmit={addNewPost} />
            <div className={cs.posts}>
                {postElements}
            </div>
        </div>
    )
})
export default MyPosts

// class MyPosts extends React.PureComponent {
//     render() {
//         let postElements =
//             this.props.postsData.map((posts) => <Post key={posts.id} message={posts.message} likesCount={posts.likesCount} />)

//         let addNewPost = (values) => {
//             this.props.addPost(values.newPostText);
//         }

//         return (
//             <div className={cs.myPost}>
//                 <h3>My post</h3>
//                 <NewPostReduxForm onSubmit={addNewPost} />
//                 <div className={cs.posts}>
//                     {postElements}
//                 </div>
//             </div>
//         )
//     }
// }
