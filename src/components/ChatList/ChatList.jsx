import './ChatList.css'
import { SocketContext } from "../../context/socket.context"
import { useContext } from 'react'

const ChatList = ({ chatList, setChatId }) => {

    const { connection } = useContext(SocketContext)


    return (
        <div>
            <h3>My chat list</h3>

            {chatList?.length !== 0 ? <div style={{ "maxHeight": "66vh", "overflow": "scroll", "overflowX": "hidden" }}>
                {chatList?.map(chat => {

                    const { trip, users, _id, driver } = chat
                    console.log(users)

                    return (

                        <div key={chat._id} className='chatWrapper mouse-over' onClick={() => {
                            setChatId(_id)
                            connection.emit('ConnectRequest', { room: _id })
                        }} >
                            <h5 className='chatTitle fw-bold'> {trip?.origin_address} - {trip?.destination_address}</h5>
                            <ul className="d-flex list-style fw-semibolder flex-wrap">Members: {users.map((elm, i) => <li key={elm._id}>{i === users.length - 1 ? elm.username + '.' : elm.username + ','}</li>)}</ul>

                        </div>
                    )
                })}
            </div> : <p className='fs-5 text-secondary'>There are no chats yet, create a trip or join one to start chatting.</p>}

        </ div>
    )
}

export default ChatList


