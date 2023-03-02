type MessagesReceivedSubscrberType = (messages: Array<ChatMessageType>) => void
type StatusChangedSubscrberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'
export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string

}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
    },

    subscribe(eventName: EventsNamesType,
        callback: MessagesReceivedSubscrberType | StatusChangedSubscrberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType,
        callback: MessagesReceivedSubscrberType | StatusChangedSubscrberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        if (ws) {
            ws.send(message)
        }
    }
}


let subscribers = {
    'messages-received': [] as Array<MessagesReceivedSubscrberType>,
    'status-changed': [] as Array<StatusChangedSubscrberType>
}

let ws: WebSocket | null = null

const closeHendler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
}

const messageHendler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHendler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHendler = () => {
    notifySubscribersAboutStatus('error')
    console.error('RESTART PAGE')
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChanel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')

    ws.addEventListener('close', closeHendler)
    ws.addEventListener('message', messageHendler)
    ws.addEventListener('open', openHendler)
    ws.addEventListener('error', errorHendler)
}

const cleanUp = () => {
    if (ws) {
        ws.removeEventListener('close', closeHendler) // Зачищаем подписку
        ws.removeEventListener('message', messageHendler)
        ws.removeEventListener('open', openHendler)
        ws.removeEventListener('error', errorHendler)
        ws.close()
    }
}




