import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControl/FormsControl';
import DialogItem from './DialogItem/DialogsItem';
import cs from './Dialogs.module.css'
import Message from './Message/Message';


const maxLength100 = maxLengthCreator(20)
const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} placeholder={'Enter your message'} name={'newMessage'}
                validate={[requiredField, maxLength100]} />
            <button >Add message</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({ form: 'addDialogsMassage' })(DialogsForm)


const Dialogs = (props) => {
    let dialogsElements = props.dialogsData.map((humans) => <DialogItem id={humans.id} key={humans.id} name={humans.name} />)
    let messageElements = props.messagesData.map((dialog) => <Message id={dialog.id} key={dialog.id} text={dialog.message} />)

    let addNewMessage = (values) => {
        props.sendMessageAC(values.newMessage);
    }

    // if (!props.isAuth) {
    //     return <Navigate to={'/login'} />
    // }

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