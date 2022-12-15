import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from '../../context/userMessage.context'

const UserMessage = () => {

    const { setShowToast, toastMessage, showToast } = useContext(MessageContext)

    return (
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3500} autohide style={{ position: 'fixed', bottom: 30, right: 15 }}>
            <Toast.Header>
                <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

    )
}

export default UserMessage