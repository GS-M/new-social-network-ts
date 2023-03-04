import cs from './ChatPage.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageTC, startMessagesListeningTC, stopMessagesListeningTC } from '../../redux/chatReduser';
import { AppDispatch } from '../../redux/redux-store';
import { useSelector } from 'react-redux';
import { selectMessages, selectStatus } from '../../utils/resecelectors/chat-selectors';
import { ChatMessageType } from '../../api/chat-api';




const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}



const Chat: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(selectStatus)


    useEffect(() => {
        dispatch(startMessagesListeningTC())
        return () => {
            dispatch(stopMessagesListeningTC())
        }
    }, [])

    return (
        <div>
            {
                status === 'error' && <div>Some error. Please restart page</div>
            }

            <>
                <ChatMessages />
                <AddChatMessageForm />
            </>

        </div>
    )
}



const ChatMessages: React.FC = () => {
    const messages = useSelector(selectMessages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAtoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            setIsAtoScroll(true)
        } else {
            setIsAtoScroll(false)
        }
    }

    useEffect(() => {
        if (messageAnchorRef.current && isAutoScroll) {
            messageAnchorRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className={cs.chat_body} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
            <div ref={messageAnchorRef}></div>
        </div>
    )
}



const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <div>
            <img className={cs.small_avatar} src={message.photo} alt='avatar' />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    )
})


const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const status = useSelector(selectStatus)
    const dispatch: AppDispatch = useDispatch()

    const sendMessage = () => {
        dispatch(sendMessageTC(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage