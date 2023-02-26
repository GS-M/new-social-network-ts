import { ContactsType, ProfileType } from '../../../../common-types/common-types';
import cs from './ProfileData.module.css';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}
export const ProfileData: React.FC<PropsType> = (props) => {

    return (
        <div className={cs.profileData}>
            {props.isOwner && <div><button onClick={props.activateEditMode}>Редактировать</button></div>}
            <div className={cs.personalData}>
                <div>
                    <b>Имя: </b> {props.profile.fullName}
                </div>
                <div>
                    <b>О себе: </b>{props.profile.aboutMe}
                </div>
            </div>
            <div className={cs.jobBlock}>
                <div>
                    <b>Статус поиска работы:</b> {props.profile.lookingForAJob ? 'В поиске' : 'Не ищу'}
                </div>
                {props.profile.lookingForAJob &&
                    <div>
                        <b>Мои навыки:</b> {props.profile.lookingForAJobDescription}
                    </div>
                }
            </div>
            <div className={cs.contactsBlock}>
                <b>Контакты: </b>
                {Object.keys(props.profile.contacts)
                    .map(key => {
                        return (<Contact key={key}
                            contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]} />)
                        // [key] читаю свойство по ключу
                    })}
            </div>
        </div>
    )
}
type ContactType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
    return (<div className={cs.contact}><b>{contactTitle}:</b> {contactValue}</div>)
}
