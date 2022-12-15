import { useState, useEffect } from "react"
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import socket from "../../config/socket.config";
import chatService from "../../services/chat.service"

const Messages = ({ chatId, setMessages }) => {


    const [currentMessageList, setCurrentMessageList] = useState([])
    const [messageList, setMessageList] = useState({})

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            console.log(data)
            setMessages((list) => [...list, data])
        })
    }, [socket])

    // useEffect(() => {

    //     chatService
    //         .getChatDetails(chatId)
    //         .then(({ data }) => {
    //             setMessageList(data)
    //         })
    //         .catch(error => console.log(error))

    // }, [])

    // console.log(messageList.messages)

    return (
        <p>JUST CHATTING</p>

        // <div>
        //     {
        //         messageList?.messages?.map((elm) => {
        //             return (
        //                 <div key={elm._id}>
        //                     <h1>{elm?.author?.username}</h1>
        //                 </div>
        //             )

        //         })
        //     }
        //     {
        //         currentMessageList.map(({ author, message, time }, i) => {
        //             return (<div key={i}>
        //                 <h1>{author}</h1>
        //                 <p>{message}</p>
        //                 <p>{time}</p>
        //             </div>)


        //         })
        //     }
        // </div>
    )

}

export default Messages