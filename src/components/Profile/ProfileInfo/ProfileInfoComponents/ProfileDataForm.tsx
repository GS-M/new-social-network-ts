import cs from './ProfileData.module.css';
import styleError from '../../../common/FormsControl/FormsControl.module.css'
import { createField, Input, Textarea } from '../../../common/FormsControl/FormsControl'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../../common-types/common-types';
//

type ProfileFormValuesTypeKeys = Extract<keyof ProfileType, string>

type ProfileFormOwnPropsType = {
    profile: ProfileType
}
const ProfileDataForm:
    React.FC<InjectedFormProps<ProfileType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType>
    = (props) => {
        return (
            <form className={cs.profileData} onSubmit={props.handleSubmit}>
                {/* без onClick, форма сама засобмитит при нажатии кнопки */}
                <div><button>Сохранить</button></div>
                {props.error && <div className={styleError.form_summary_error}>
                    {props.error}
                </div>}

                <div className={cs.personalData}>
                    <div>
                        <b>Имя: </b>
                        {createField<ProfileFormValuesTypeKeys>
                            ('Полное имя', Input, 'fullName', [], {}, '')}
                    </div>
                    <div>
                        <b>О себе: </b>
                        {createField<ProfileFormValuesTypeKeys>
                            ('Напишите о себе', Textarea, 'aboutMe', [], {}, '')}
                    </div>
                </div>
                <div className={cs.jobBlock}>
                    <div>
                        <b>Статус поиска работы:</b>
                        {createField<ProfileFormValuesTypeKeys>
                            ('', Input, 'lookingForAJob', [], { type: 'checkbox' }, '')}
                    </div>

                    <div>
                        <b>Мои навыки:</b>
                        {createField<ProfileFormValuesTypeKeys>
                            ('Ваши навыки', Textarea, 'lookingForAJobDescription', [], {}, '')}
                    </div>

                </div>
                <div className={cs.contactsBlock}>

                    <b>Контакты: </b>
                    {Object.keys(props.profile.contacts)
                        .map(key => {
                            return (
                                <div key={key}>
                                    <b>{key}: {createField(key, Input, 'contacts.' + key, [], {}, '')}</b>
                                </div>
                            )
                            // [key] читаю свойство по ключу
                        })}
                </div>
            </form>
        )
    }

export const ProfileDataReduxForm =
    reduxForm<ProfileType, ProfileFormOwnPropsType>({ form: 'profileData' })(ProfileDataForm)

