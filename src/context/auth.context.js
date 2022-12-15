import { createContext, useEffect, useState, useContext } from 'react'
import { SocketContext } from './socket.context'
import socket from '../config/socket.config'
import authService from '../services/auth.service'

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { connection, setConnection } = useContext(SocketContext)

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const authenticateUser = () => {

        const token = localStorage.getItem("authToken")

        authService
            .verify(token)
            .then(({ data }) => {
                setUser(data)
                setIsLoading(false)
            })
            .catch(err => {
                setUser(null)
                setIsLoading(false)
            })
    }

    const logoutUser = () => {
        setUser(null)
        setIsLoading(false)
        localStorage.removeItem('authToken')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    // useEffect(() => {

    //     if (user) {
    //         setConnection(socket.connect())
    //     } else {
    //         setConnection(socket.disconnect())
    //     }

    // }, [user])


    return (
        <AuthContext.Provider value={{ storeToken, authenticateUser, user, logoutUser, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }