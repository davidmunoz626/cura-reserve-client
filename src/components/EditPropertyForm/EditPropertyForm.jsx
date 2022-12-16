import React from 'react'
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap"
import propertiesService from "../../services/Properties.service"
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import uploadServices from '../../services/upload.service'

const EditPropertyForm = () => {

    const { property_id } = useParams()

    const [propertyData, setPropertyData] = useState({
        name: '',
        capacity: 0,
        category: '',
        lat: 0,
        lng: 0,
        image: [],
        description: '',
        city: '',
        price: '',
        extras: { pool: null, barbaque: null, terrace: null, wifi: null, airconditioning: null }
    })

    useEffect(() => {
        propertiesService
            .getOneProperty(property_id)
            .then(({ data }) => {
                const { name, capacity, location, image, description, city, price, category, extras: { pool, barbaque, terrace, wifi, airconditioning } } = data
                const [lat, lng] = location.coordinates
                const newObj = { name, capacity, lat, lng, image, description, city, price, category, extras: { pool, barbaque, terrace, wifi, airconditioning } }
                setPropertyData(newObj)
            })
            .catch(err => console.error(err))
    }, [])

    const [loadingImage, setLoadingImage] = useState(false)


    const handleInputChange = e => {
        const { name, value } = e.target
        setPropertyData({ ...propertyData, [name]: value })
    }

    const handleSwitchChange = e => {
        const { name, checked } = e.target
        setPropertyData({ ...propertyData, extras: { ...propertyData.extras, [name]: checked } })
    }

    const navigate = useNavigate()

    const handleFilesChange = e => {
        setLoadingImage(true)
        const formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imageData', e.target.files[i])
        }

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setPropertyData({ ...propertyData, image: res.data.cloudinary_urls })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }


    const handleFormSubmit = e => {
        e.preventDefault()
        propertiesService
            .editProperty(property_id, propertyData)
            .then(() => {
                navigate('/properties')
            })
            .catch(err => console.error(err))
    }


    const { name, capacity, lat, lng, image, description, city, price, category, extras: { pool, barbaque, terrace, wifi, airconditioning } } = propertyData

    return (

        <Container>
            <h1>Crear nuevo alojamiento</h1>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={name} onChange={handleInputChange} name="name" placeholder={name} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Select className="mb-3" aria-label="category" name='category' onChange={handleInputChange}>
                            <option>Categoría</option>
                            <option value="House">Apartamento</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Villa">Chalet</option>
                            <option value="Capsule-Hotel">Hotel cápsula</option>
                        </Form.Select  >
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="capacity">
                            <Form.Label>Capacidad </Form.Label>
                            <Form.Control type="number" value={capacity} onChange={handleInputChange} name="capacity" placeholder={capacity} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" value={city} onChange={handleInputChange} name="city" placeholder={city} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" value={price} onChange={handleInputChange} name="price" placeholder={price} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="lat">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="number" value={lat} onChange={handleInputChange} name="lat" placeholder={lat} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="lng">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control type="number" value={lng} onChange={handleInputChange} name="lng" placeholder={lng} />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>

                        <Form.Group className="mb-3" controlId="image" >
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" onChange={handleFilesChange} multiple />
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" value={description} onChange={handleInputChange} name="description" placeholder={description} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>

                        <Form.Check onChange={handleSwitchChange}
                            checked={pool}
                            name="pool"
                            type="switch"
                            id="custom-switch"
                            label="Piscina"
                        />

                        <Form.Check onChange={handleSwitchChange}
                            checked={barbaque}
                            name="barbaque"
                            type="switch"
                            id="custom-switch"
                            label="Barbacoa"
                        />

                        <Form.Check onChange={handleSwitchChange}
                            checked={terrace}
                            name="terrace"
                            type="switch"
                            id="custom-switch"
                            label="Terraza"
                        />

                        <Form.Check onChange={handleSwitchChange}
                            checked={wifi}
                            name="wifi"
                            type="switch"
                            id="custom-switch"
                            label="Wifi"
                        />

                        <Form.Check onChange={handleSwitchChange}
                            checked={airconditioning}
                            name="airconditioning"
                            type="switch"
                            id="custom-switch"
                            label="Aire acondicionado"
                        />

                    </Col>
                </Row>

                <div className="d-grid mb-5">
                    <Button variant="dark mt-5" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Editar'}</Button>
                </div>

            </Form>

        </Container>
    )
}

export default EditPropertyForm