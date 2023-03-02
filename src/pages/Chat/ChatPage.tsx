import cs from './ChatPage.module.css'
import { useEffect, useState } from 'react';


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
    const [wsChanal, setWsChanal] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHendler = () => {
            setTimeout(createChanel, 3000)
        }
        function createChanel() {
            if (ws) {
                ws.removeEventListener('close', closeHendler) // Зачищаем подписку
                ws.close()
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            if (ws) {
                ws.addEventListener('close', closeHendler)
            }
            setWsChanal(ws)
        }
        createChanel()

        return () => {
            // Когда компонента умрет
            ws.removeEventListener('close', closeHendler)
            ws.close()
        }
    }, [])

    useEffect(() => {

    }, [wsChanal])

    return (
        <div>
            <ChatMessages wsChanal={wsChanal} />
            <AddChatMessageForm wsChanal={wsChanal} />
        </div>
    )
}



const ChatMessages: React.FC<{ wsChanal: WebSocket | null }> = ({ wsChanal }) => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    let messageHendler = (e: MessageEvent) => {
        let newMessages = JSON.parse(e.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }
    useEffect(() => {
        if (wsChanal) {
            wsChanal.addEventListener('message', messageHendler)
        } // Синхронизация
        return () => {
            if (wsChanal) {
                wsChanal.removeEventListener('message', messageHendler)
            } // Рассинхронизация. Зачистка перед тем как придет 2-ой useEffect
        }
    }, [wsChanal])

    return (
        <div className={cs.chat_body}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}



const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img className={cs.small_avatar} src={message.photo} alt='avatar' />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    )
}

const AddChatMessageForm: React.FC<{ wsChanal: WebSocket | null }> = ({ wsChanal }) => {
    const [message, setMessage] = useState('')
    const [isReady, setIsReady] = useState<'pending' | 'ready'>('pending')

    const sendMessage = () => {
        if (wsChanal) {
            wsChanal.send(message)
            setMessage('')
        }
    }

    useEffect(() => {
        let openHandler = () => {
            setIsReady('ready')
        }
        if (wsChanal) {
            wsChanal.addEventListener('open', openHandler)
            return () => {
                wsChanal.removeEventListener('open', openHandler)
            }
        }
    }, [wsChanal])

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={isReady !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage