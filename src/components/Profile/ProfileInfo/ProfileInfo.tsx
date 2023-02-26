import { Preloader } from '../../common/Preloader/Preloader';
// import { ProfileStatus } from './ProfileStatus'
import cs from './ProfileInfo.module.css';
import usersDefaultLargePhoto from '../../../accets/images/usersDefaultLargePhoto.png';
import usersDefaultAvatar from '../../../accets/images/usersDefaultAvatar.jpg';
import { useState } from 'react';
import { ProfileData } from './ProfileInfoComponents/ProfileData';
import { ProfileDataReduxForm } from './ProfileInfoComponents/ProfileDataForm';
import { ProfileStatusHook } from './ProfileInfoComponents/ProfileStatusHook';
import { ProfileType } from '../../../common-types/common-types';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean

    savePhotoTC: (file: File) => void
    saveProfileTC: (profile: ProfileType) => void
    updateUserStatusTC: () => void
}
const ProfileInfo: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return (<Preloader />)
    }

    const onPhotoSeclected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhotoTC(e.target.files[0])
        }
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfileTC(formData)
        setEditMode(false)
    }

    return (

        <div>
            <div className={cs.imgBig}>
                <img alt="" src={usersDefaultLargePhoto} />
            </div>
            <div className={cs.description}>

                <img className={cs.avatar} alt="" src={props.profile.photos.large || usersDefaultAvatar} />
                {props.isOwner && <div><input type={'file'} onChange={onPhotoSeclected} /></div>}

                {editMode
                    ? <ProfileDataReduxForm onSubmit={onSubmit} profile={props.profile} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                        activateEditMode={onEditMode} />
                }
                <ProfileStatusHook status={props.status} updateUserStatusTC={props.updateUserStatusTC} />
            </div>
        </div>
    )
}

//'https://zoolegenda.ru/common/htdocs/upload/thumbs/breed_medium/mops_59f0a3.png'
//'https://i3.mybook.io/p/x480/bookset/0e/4e/0e4e921f-8dd7-4ba2-834d-7b1161992f83.png'

export default ProfileInfo