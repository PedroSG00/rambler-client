import { io } from 'socket.io-client'

const URL = process.env.REACT_APP_API_SOCKET
console.log('---------------------', process.env.REACT_APP_API_SOCKET)
console.log('---------------------', process.env.REACT_APP_API_URL)

const socket = io(URL)

export default socket