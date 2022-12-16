import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg" >
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand as="div"> <img src='../../logo.png' height={'50'} width={'50'} alt=
                        'Cura Reserve' /></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Link to="/hotels">
                            <Nav.Link as='div'>Hoteles</Nav.Link>
                        </Link>
                        <Link to="/properties">
                            <Nav.Link as="div">Alojamientos</Nav.Link>
                        </Link>
                        <Link to="/create-propety">
                            {user?.role === "ADMIN" && <Nav.Link as="div">Crear nuevo alojamiento</Nav.Link>}
                        </Link>
                        <Link to="/profile">
                            <Nav.Link as="div">Perfil</Nav.Link>
                        </Link>
                        <Link to="/maps">
                            <Nav.Link as="div">Mapa</Nav.Link>
                        </Link>


                        <Form className="d-flex me-5">
                            <NavDropdown title="Mi cuenta" id="navbarScrollingDropdown">

                                <Link to="/login">
                                    <NavDropdown.Item as="div">Iniciar sesión</NavDropdown.Item>
                                </Link>

                                <Link to="/">
                                    <NavDropdown.Item as="div">
                                        {user && <Nav.Link as="div" onClick={logoutUser}>Cerrar sesión</Nav.Link>}
                                    </NavDropdown.Item>
                                </Link>

                                <NavDropdown.Divider />
                                <Link to="/register">
                                    <NavDropdown.Item as="div">Registrarse</NavDropdown.Item>
                                </Link>

                            </NavDropdown>
                        </Form>
                    </Nav>
                    <Nav.Link as="div">¡Hola, {!user ? 'invitad@' : user.username}!</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
export default Navigation