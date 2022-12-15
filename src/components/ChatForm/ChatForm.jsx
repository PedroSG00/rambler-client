import { InputGroup, Form, Button } from "react-bootstrap"
// import socket from "../../config/socket.config"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import chatService from "../../services/chat.service"
const ChatForm = ({ chatId, socket, sendMessage }) => {

    const { user } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState('')
    const [chatDetails, setChatDetails] = useState({})


    const handleMessage = (e) => {
        setNewMessage(e.target.value)
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()
        sendMessage(newMessage, setNewMessage)
    }


    return (
        <div>
            <Form onSubmit={handleFormSubmit} className='d-flex'>
                <InputGroup>
                    <Form.Group className="mb-3 mt-3 w-75" controlId="text">
                        <Form.Control onChange={handleMessage} type="text" value={newMessage} />
                    </Form.Group>
                    <Button type="submit">
                        Send
                    </Button>
                </InputGroup>
            </Form>
        </div>
    )

}
export default ChatForm