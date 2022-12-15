import { createContext, useState } from 'react'

const MessageContext = createContext()

function MessageProviderWrapper(props) {

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    return (
        <MessageContext.Provider value={{ setShowToast, showToast, setToastMessage, toastMessage }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }