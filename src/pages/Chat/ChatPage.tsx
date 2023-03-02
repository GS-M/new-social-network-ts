import cs from './ChatPage.module.css'
import { useEffect, useState } from 'react';

const wsChanal = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string

}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {


    return (
        <div>
            <ChatMessages />
            <AddChatMessageForm />
        </div>
    )
}

const ChatMessages: React.FC = () => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        wsChanal.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div className={cs.chat_body}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img className={cs.small_avatar} src={message.photo} />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    )
}

const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        wsChanal.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage