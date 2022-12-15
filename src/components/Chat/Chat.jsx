import './Chat.css'
import { useEffect, useState, useContext } from "react"
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

    useEffect(() => {

        chatService
            .getChatDetails(chatId)
            .then(({ data }) => {
                console.log('-details-----------------------', data)
                setMessages(data.messages)
            })
            .catch(error => console.log(error))
    }, [])


    const sendMessage = async (newMessage, setNewMessage) => {
        console.log('send message')
        if (newMessage !== "") {

            const messageData = {

                room: chatId,
                author: user,
                text: newMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }

            await socket.emit("sendMessage", messageData)

            const { time, text, room } = messageData

            const response = await chatService.sendMessage(room, { time, text })


            setMessages(response.data.messages)

            setNewMessage("")

        }
    }




    useEffect(() => {
        connection.on('ConnectResponse', (payload) => { console.log('--------------', payload) })
    }, [connection])



    console.log(messages)

    return (
        <div className="ChatView">
            <Messages chatId={chatId} setMessages={setMessages} />
            {messages.map(el => {
                return (
                    <>
                        <p>{el.author.username}</p>
                        <p>{el.text}</p>
                    </>
                )
            })}
            <ChatForm chatId={chatId} socket={socket} sendMessage={sendMessage} />
        </div>
    )

}

export default Chat

