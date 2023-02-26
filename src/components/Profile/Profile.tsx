import { ProfileType } from '../../common-types/common-types';
import MyPostsContainer from './MyPosts/MyPostsConatainer';
import cs from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean

    savePhotoTC: (file: File) => void
    saveProfileTC: (profile: ProfileType) => void
    updateUserStatusTC: () => void
}
const Profile: React.FC<PropsType> = (props) => {
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