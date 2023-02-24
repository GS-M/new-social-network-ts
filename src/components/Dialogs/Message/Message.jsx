import cs from './Message.module.css'

const Message = (props) => {
    return (
        <div className={cs.message}>{props.text}</div>
    )
}

export default Message;