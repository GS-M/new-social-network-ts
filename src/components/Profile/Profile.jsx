import MyPostsContainer from './MyPosts/MyPostsConatainer';
import cs from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div className={cs.prof}>
            <ProfileInfo profile={props.profile} status={props.status}
                updateUserStatusTC={props.updateUserStatusTC}
                isOwner={props.isOwner} savePhotoTC={props.savePhotoTC}
                saveProfileTC={props.saveProfileTC} />
            <MyPostsContainer />
        </div>
    )
}
export default Profile