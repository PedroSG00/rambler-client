import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { MessageContext } from "../../context/userMessage.context"
import authService from "../../services/auth.service"


const LoginForm = ({ closeModal }) => {

    const [signupData, setSignupData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([])


    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(signupData)
            .then(({ data }) => {
                const tokenFromServer = data.authToken
                storeToken(tokenFromServer)
                authenticateUser()
                setShowToast(true)
                setToastMessage('User logged in')
                navigate('/')
                closeModal()
            })
            .catch(err => {
                console.log(err.response.data.errorMessages)
                setErrors(err.response.data.errorMessages)
            })
    }

    const { password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit">Log In</Button>
            </div>


        </Form>
    )
}

export default LoginForm