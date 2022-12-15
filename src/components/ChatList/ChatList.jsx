import { SocketContext } from "../../context/socket.context"
import { useContext } from 'react'

const ChatList = ({ chatList, setChatId }) => {

    const { connection } = useContext(SocketContext)


    return (

        chatList?.map(chat => {

            const { trip } = chat
            const { _id } = chat

            return (
                <div key={chat._id} className='chatWrapper' onClick={() => {
                    setChatId(_id)
                    connection.emit('ConnectRequest', { room: _id })
                }
                } >
                    <h3 className='chatTitle'> {trip.origin_address} - {trip.destination_address}</h3>

                </div>
            )
        }))
}

export default ChatList