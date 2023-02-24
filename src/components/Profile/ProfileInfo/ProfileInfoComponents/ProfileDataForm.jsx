import cs from './ProfileData.module.css';
import styleError from '../../../common/FormsControl/FormsControl.module.css'
import { createField, Input, Textarea } from '../../../common/FormsControl/FormsControl'
import { reduxForm } from 'redux-form';

const ProfileDataForm = (props) => {
    return (
        <form className={cs.profileData} onSubmit={props.handleSubmit}>
            {/* без onClick, форма сама засобмитит при нажатии кнопки */}
            <div><button>Сохранить</button></div>
            {props.error && <div className={styleError.form_summary_error}>
                {props.error}
            </div>}

            <div className={cs.personalData}>
                <div>
                    <b>Имя: </b> {createField('Полное имя', Input, 'fullName', [], {}, null)}
                </div>
                <div>
                    <b>О себе: </b>{createField('Напишите о себе', Textarea, 'aboutMe', [], {}, null)}
                </div>
            </div>
            <div className={cs.jobBlock}>
                <div>
                    <b>Статус поиска работы:</b>
                    {createField('', Input, 'lookingForAJob', [], { type: 'checkbox' }, null)}
                </div>

                <div>
                    <b>Мои навыки:</b>
                    {createField('Ваши навыки', Textarea, 'lookingForAJobDescription', [], {}, null)}
                </div>

            </div>
            <div className={cs.contactsBlock}>

                <b>Контакты: </b>{Object.keys(props.profile.contacts).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}: {createField(key, Input, 'contacts.' + key, [], {}, null)}</b>
                        </div>
                    )
                    // [key] читаю свойство по ключу
                })}
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm({ form: 'profileData' })(ProfileDataForm)

