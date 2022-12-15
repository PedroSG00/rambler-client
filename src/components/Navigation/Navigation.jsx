import './Navigation.css'
import { useContext, useState } from 'react'
import { Nav, Container, Navbar, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { MagnifyingGlass, PlusCircle, UserCircle } from "phosphor-react"
import logo from "./../../assets/logo.png"
import { AuthContext } from '../../context/auth.context'
import { MessageContext } from '../../context/userMessage.context'
import LoginForm from '../LogInForm/LogInForm'
import SignupForm from '../SignUpForm/SignUpForm'

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    const closeModal = () => setShowModal(false)

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const [showModal, setShowModal] = useState(false)
    const [value, setValue] = useState('')


    const handleValue = e => {
        if (e.target.value === 'log-in') {
            setShowModal(true)
            setValue('log-in')
        } else {
            setShowModal(true)
            setValue('sign-up')
        }
    }

    const logOut = () => {
        logoutUser()
        setShowToast(true)
        setToastMessage('User logged out')
    }

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage('User created correctly')
        closeModal()
    }






    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Link to='/'>
                        <Navbar.Brand as='div'><img src={logo} className="app-logo"></img></Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ms-auto'>
                        </Nav>
                        <Nav>
                            <Link to='/trip/search'>
                                <Nav.Link as='div' className='text-color'><MagnifyingGlass size={28} /><span className="nav-title">Search Trips</span></Nav.Link>
                            </Link>
                            <Link to='/trip/add'>
                                <Nav.Link className="text-color" as='div'><PlusCircle size={28} /><span className="nav-title">Add Trip</span></Nav.Link>
                            </Link>
                            <NavDropdown title={<div style={{ display: "inline-block" }}><UserCircle size={28} /></div>} id="collasible-nav-dropdown">

                                {user ?
                                    <>
                                        <Link to='/user/profile'>
                                            <NavDropdown.Item as='div' className='text-color'>View profile</NavDropdown.Item>
                                        </Link>
                                        <Link to='/'>
                                            <NavDropdown.Item as='div' className='text-color' onClick={logOut}>
                                                Log Out
                                            </NavDropdown.Item>
                                        </Link>

                                    </>
                                    :
                                    <>
                                        <NavDropdown.Item as='button' value='sign-up' onClick={handleValue} className='text-color bg-transparent text-decoration-none'>Sign Up</NavDropdown.Item>
                                        <NavDropdown.Item as='button' value='log-in' onClick={handleValue} className='text-color bg-transparent text-decoration-none'>Log in</NavDropdown.Item>
                                    </>
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{value === 'log-in' ? 'Log in' : 'Sign up'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {value === 'log-in' ? <LoginForm closeModal={closeModal} /> : <SignupForm fireFinalActions={fireFinalActions} />}
                </Modal.Body>
            </Modal>


        </>

    )
}



export default Navigation


