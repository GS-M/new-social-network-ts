import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControl/FormsControl';
import cs from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength10 = maxLengthCreator(10)

const newPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} placeholder={'Enter your new post'} name={'newPostText'}
                    validate={[requiredField, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const NewPostReduxForm = reduxForm({ form: 'addNewPostText' })(newPostForm)

const MyPosts = React.memo((props) => {

    let postElements =
        [...props.postsData] // Работаю с копией(иммутабельность)
            .reverse().map((posts) => <Post key={posts.id} message={posts.message} likesCount={posts.likesCount} />)

    let addNewPost = (values) => {
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
export default MyPosts