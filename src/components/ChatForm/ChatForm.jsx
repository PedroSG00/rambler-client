import { InputGroup, Form, Button } from "react-bootstrap"
import { useState } from "react"
import { PaperPlaneTilt } from 'phosphor-react'
const ChatForm = ({ sendMessage }) => {

    const [newMessage, setNewMessage] = useState('')


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
                    <Form.Control onChange={handleMessage} type="text" value={newMessage} />
                    <Button type="submit">
                        <PaperPlaneTilt size={32} />
                    </Button>
                </InputGroup>
            </Form>
        </div>

    )

}
export default ChatForm