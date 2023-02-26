import cs from './Message.module.css'

type PropsType = {
    text: string
    id: number
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={cs.message}>{props.text}</div>
    )
}

export default Message;