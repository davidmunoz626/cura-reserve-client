import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/Auth.service"
import { useNavigate } from 'react-router-dom'
import ErrorMessage from "../ErrorMessage/ErrorMessage"


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        profileImg: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }



    const { username, password, email, profileImg } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className=" mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                    type="file"
                    name="profileImg"
                    value={profileImg}
                    onChange={handleInputChange}

                />
            </Form.Group>


            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm