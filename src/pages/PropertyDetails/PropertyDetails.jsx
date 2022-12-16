import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, Spinner } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import propertiesService from "../../services/Properties.service"
import MyCarousel from '../../components/PropertyCard/MyCarousel';
import Map from "../../components/Map/Map";
import { AuthContext } from '../../context/auth.context'


const PropertyDetailsPage = () => {
    const { user, logoutUser } = useContext(AuthContext)

    const [property, setProperty] = useState()
    const { property_id } = useParams()

    const loadProperty = () => {
        propertiesService
            .getOneProperty(property_id)
            .then(({ data }) => setProperty(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadProperty()
    }, [])


    const deleteProperty = () => {
        propertiesService
            .delete(property_id)
            .then(({ data }) => setProperty(data))
            .catch(err => console.error(err))
    }

    return (

        <Container>
            {
                !property
                    ?

                    <Spinner />
                    :
                    <>
                        <h1 className="mb-4 text-center mt-5">{property.name}</h1>
                        <hr />

                        <Row>
                            <Col md={{ span: 5 }}>
                                <br />
                                <MyCarousel arrayOfImage={property.image} />
                                <br />
                                <Map {...property.location} />
                                <br />
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>

                                <h3 className='mb-2 mt-4'>Capacidad:</h3>
                                <p>{property.capacity} personas</p>
                                <hr />
                                <h3 className='mb-2 mt-4'>Categoría:</h3>
                                <p>{property.category}</p>
                                <hr />
                                <h3>Precio por noche:</h3>
                                <p>{property.price}€ </p>
                                <hr />
                                <h3>Ciudad: </h3>
                                <p>{property.city}</p>
                                <hr />
                                <h3>Descripción:</h3>
                                <br />
                                <p>{property.description}</p>
                                <hr />
                                <h3>Extras:</h3>
                                <ul>
                                    <li>Piscina: {property.extras.pool ? '✅' : '❌'}</li>
                                    <li>Barbacoa: {property.extras.barbaque ? '✅' : '❌'}</li>
                                    <li>Terraza: {property.extras.terrace ? '✅' : '❌'}</li>
                                    <li>Wifi: {property.extras.wifi ? '✅' : '❌'}</li>
                                    <li>Aire acondicionado: {property.extras.airconditioning ? '✅' : '❌'}</li>
                                </ul>
                                <hr />

                                <Link to={`/booking/${property_id}`}>
                                    <Button as="div" variant="outline-dark" className='me-3 mb-4 mt-2'>Reservar</Button>
                                </Link>
                                <Link to="/properties">
                                    <Button as="div" variant="outline-dark" className='me-3 mb-4 mt-2'>Volver a la Lista</Button>
                                </Link>
                                <Link to={`/edit/${property_id}`}>
                                    {(user?._id === property.createdBy || user?.role === "ADMIN") && < Button variant="outline-warning" className='me-3 mb-4 mt-2'>Editar</Button>}
                                </Link>
                                <Link to="/properties">
                                    {(user?._id === property.createdBy || user?.role === "ADMIN") && <Button variant="outline-danger" className='me-3 mb-4 mt-2' onClick={deleteProperty}>Eliminar</Button>}
                                </Link>
                            </Col>


                        </Row>
                    </>
            }


        </Container >
    )
}

export default PropertyDetailsPage