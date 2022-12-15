import { useState, useContext } from "react"
import { MessageContext } from "../../context/userMessage.context"
import LoginForm from "../LogInForm/LogInForm"



const Modal = () => {

    const closeModal = () => setShowModal(false)

    return (
        <></>
        // <Modal show={showModal} onHide={closeModal}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Hola</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <LoginForm />
        //     </Modal.Body>
        // </Modal>
    )
}

export default Modal