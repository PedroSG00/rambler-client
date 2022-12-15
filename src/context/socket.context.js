import { createContext, useState } from "react";
import socket from "../config/socket.config";


const SocketContext = createContext()

const SocketProvider = (props) => {
    const [connection, setConnection] = useState(socket)
    return (
        <SocketContext.Provider value={{ connection, setConnection }}>
            {props.children}
        </SocketContext.Provider>
    )


}

export { SocketContext, SocketProvider }