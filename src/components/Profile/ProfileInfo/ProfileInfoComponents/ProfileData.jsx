import cs from './ProfileData.module.css';

export const ProfileData = (props) => {

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
                <b>Контакты: </b>{Object.keys(props.profile.contacts).map(key => {
                    return (<Contact key={key}
                        contactTitle={key} contactValue={props.profile.contacts[key]} />)
                    // [key] читаю свойство по ключу
                })}
            </div>
        </div>
    )
}
const Contact = ({ contactTitle, contactValue }) => {
    return (<div className={cs.contact}><b>{contactTitle}:</b> {contactValue}</div>)
}
