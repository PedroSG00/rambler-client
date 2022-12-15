import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import uploadServices from "../../services/upload.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from '../../context/userMessage.context'
import authService from "../../services/auth.service"

const SignupForm = ({ fireFinalActions }) => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        firstname: '',
        lastname: '',
        imageUrl: '',
        age: 0,
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])


    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const navigate = useNavigate()




    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/')
                fireFinalActions()

            })
            .catch(err => setErrors(err.response.data.errorMessages))

    }


    const { username, password, email, firstname, lastname, age } = signupData

    return (

        <Form onSubmit={handleSubmit}>



            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" value={firstname} onChange={handleInputChange} name="firstname" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" value={lastname} onChange={handleInputChange} name="lastname" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={age} onChange={handleInputChange} name="age" />
            </Form.Group>

            <Form.Select className="mb-3 mt-3" name="gender" onChange={handleInputChange}>
                <option>Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="UNDEFINED">Other</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Profile image</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button type="submit" disabled={loadingImage}>{loadingImage ? 'Uploading image' : 'Register'}</Button>
            </div>
        </Form>
    )
}

export default SignupForm