import { io } from 'socket.io-client'

const URL = "http://localhost:5005"

const socket = io(URL)

export default socket