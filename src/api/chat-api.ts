type Subscrbertype = (messages: Array<ChatMessageType>) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string

}

let subscribers = [] as Array<Subscrbertype>

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHendler)
        ws?.removeEventListener('message', messageHendler)
        ws?.close()
    },
    subscribe(callback: Subscrbertype) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: Subscrbertype) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        if (ws) {
            ws.send(message)
        }
    }
}


let ws: WebSocket | null = null

const closeHendler = () => {
    setTimeout(createChanel, 3000)
}

const messageHendler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChanel() {
    if (ws) {
        ws.removeEventListener('close', closeHendler) // Зачищаем подписку
        ws.close()
    }
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    ws.addEventListener('close', closeHendler)
    ws.addEventListener('message', messageHendler)
}




