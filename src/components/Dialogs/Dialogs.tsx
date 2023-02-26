import { InjectedFormProps, reduxForm } from 'redux-form';
import { DialogsDataType, MessagesDataType } from '../../common-types/common-types';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { createField, Textarea } from '../common/FormsControl/FormsControl';
import DialogItem from './DialogItem/DialogsItem';
import cs from './Dialogs.module.css'
import Message from './Message/Message';

type DialogsFormValuesType = {
    newMessage: string
}
type DialogsFormValuesTypeKeys = Extract<keyof DialogsFormValuesType, string>
type LoginFormOwnPropsType = {
}

const maxLength100 = maxLengthCreator(20)
const DialogsForm:
    React.FC<InjectedFormProps<DialogsFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                {createField<DialogsFormValuesTypeKeys>
                    ('Enter your message', Textarea, 'newMessage', [requiredField, maxLength100])}

                {/* <Field component={Textarea} placeholder={'Enter your message'} name={'newMessage'}
                    validate={[requiredField, maxLength100]} /> */}
                <button >Add message</button>
            </form>
        )
    }

const DialogsReduxForm = reduxForm<DialogsFormValuesType, LoginFormOwnPropsType>({ form: 'addDialogsMassage' })(DialogsForm)

// type NewMessageFormType = {
//     newMessage: string
// }
type PropsType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    sendMessageAC: (messageText: string) => void
}
const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElements = props.dialogsData.map((humans) => <DialogItem id={humans.id} key={humans.id} name={humans.name} />)
    let messageElements = props.messagesData.map((dialog) => <Message id={dialog.id} key={dialog.id} text={dialog.message} />)

    let addNewMessage = (values: DialogsFormValuesType) => { //////
        props.sendMessageAC(values.newMessage);
    }

    // if (!props.isAuth) {
    //     return <Navigate to={'/login'} />
    // }
    // now it in HOC

    return (
        <div className={cs.dialogs}>
            <div className={cs.dialogsItem}>{dialogsElements}</div>
            <div className={cs.messages}>{messageElements}</div>
            <DialogsReduxForm onSubmit={addNewMessage} />
        </div>
    )
}

export default Dialogs;
/* <textarea component={'textarea'} placeholder={'Enter your message'} value={newMessageBody}
            onChange={onMessageBodyChange} ></textarea>
        <button onClick={onAddMessage}>Add message</button> */