import './ChatPages.css'
import userService from '../../services/user.service'
import Chat from '../../components/Chat/Chat'
import ChatList from '../../components/ChatList/ChatList'
import { Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const ChatPage = () => {

    const [chatList, setChatList] = useState(null)
    const [chatId, setChatId] = useState('')

    const handleList = () => {
        userService.getChats()
            .then(({ data }) => {
                const { chats } = data
                setChatList(chats)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleList()
    }, [])



    return (
        <Container className='ChatPage' >
            <Row className='mt-5'>
                <Col md={4}>
                    <ChatList setChatId={setChatId} chatList={chatList}></ChatList>
                </Col>
                <Col md={8}>
                    {chatId !== '' ? <Chat chatId={chatId} /> : <Col md={{ span: 4, offset: 4 }} className='d-flex align-items-center justify-content-center mt-5' > <span className="loader"></span> </Col>}
                </Col>
            </Row>
        </Container >

    )
}

export default ChatPage