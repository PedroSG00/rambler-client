import './Chat.css'
import { useEffect, useState, useContext, useRef } from "react"
import chatService from "../../services/chat.service"
import { SocketContext } from "../../context/socket.context"
import socket from '../../config/socket.config'
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import ChatForm from '../ChatForm/ChatForm'
import Messages from '../Messages/Messages'
import { AuthContext } from '../../context/auth.context'

const Chat = ({ chatId }) => {

    const { connection } = useContext(SocketContext)
    const { user } = useContext(AuthContext)
    const { username } = user
    const [messages, setMessages] = useState([])
    const elm = useRef(null)


    useEffect(() => {

        chatService
            .getChatDetails(chatId)
            .then(({ data }) => {
                console.log('-details-----------------------', data)
                setMessages(data.messages)
            })
            .catch(error => console.log(error))
    }, [chatId])

    useEffect(() => {
        elm.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    const sendMessage = async (newMessage, setNewMessage) => {
        console.log('send message')
        if (newMessage !== "") {

            const messageData = {

                room: chatId,
                author: user,
                text: newMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }

            socket.emit("sendMessage", messageData)

            console.log('eeeeeeeeeeeeeeeeeee', messageData)

            const { time, text, room } = messageData

            const response = await chatService.sendMessage(room, { time, text })

            setMessages(response.data.messages)

            setNewMessage("")

        }
    }

    useEffect(() => {
        console.log('conectando...')
        connection.on('ConnectResponse', (payload) => { console.log('--------------', payload) })
    }, [connection])

    console.log('connection--------------------------', connection)

    return (
        <div className="ChatView">
            <div style={{ "maxHeight": "60vh", "overflow": "scroll", "overflowX": "hidden" }} className='mb-3 mt-3' >
                <Messages chatId={chatId} setMessages={setMessages} messages={messages} />
                <div ref={elm} />
            </div>

            <ChatForm chatId={chatId} socket={socket} sendMessage={sendMessage} />
        </div >
    )

}

export default Chat