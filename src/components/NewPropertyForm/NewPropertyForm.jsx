import React from 'react'
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import propertiesService from "../../services/Properties.service"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import uploadServices from '../../services/upload.service'
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const NewPropertyForm = () => {

  const [propertyData, setPropertyData] = useState({
    name: '',
    capacity: 0,
    category: '',
    lat: 0, lng: 0,
    image: [],
    description: '',
    city: '',
    price: '',
    extras: { pool: null, barbaque: null, terrace: null, wifi: null, airconditioning: null }
  })

  const [loadingImage, setLoadingImage] = useState(false)
  const [errors, setErrors] = useState([])

  const handleInputChange = e => {
    const { name, value } = e.target
    setPropertyData({ ...propertyData, [name]: value })
  }

  const handleSwitchChange = e => {
    const { name, checked } = e.target
    setPropertyData({ ...propertyData, extras: { ...propertyData.extras, [name]: checked } }
    )
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
      .saveProperty(propertyData)
      .then(() => {
        navigate('/properties')
      })
      .catch(err => setErrors(err.response.data.errorMessages))
  }

  const { name, capacity, lat, lng, image, description, city, price, category, extras: { pool, barbaque, terrace, wifi, airconditioning } } = propertyData

  return (
    <>


      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
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
              <Form.Control type="number" value={capacity} onChange={handleInputChange} name="capacity" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" value={city} onChange={handleInputChange} name="city" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" value={price} onChange={handleInputChange} name="price" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="lat">
              <Form.Label>Latitud</Form.Label>
              <Form.Control type="number" value={lat} onChange={handleInputChange} name="lat" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lng">
              <Form.Label>Longitud</Form.Label>
              <Form.Control type="number" value={lng} onChange={handleInputChange} name="lng" />
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
              <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>
          </Col>
        </Row>



        <Row>
          <Col>


            <Form.Check onChange={handleSwitchChange}
              name="pool"
              type="switch"
              id="custom-switch"
              label="Piscina"
            />

            <Form.Check onChange={handleSwitchChange}
              name="barbaque"
              type="switch"
              id="custom-switch"
              label="Barbacoa"
            />

            <Form.Check onChange={handleSwitchChange}
              name="terrace"
              type="switch"
              id="custom-switch"
              label="Terraza"
            />

            <Form.Check onChange={handleSwitchChange}
              name="wifi"
              type="switch"
              id="custom-switch"
              label="Wifi"
            />

            <Form.Check onChange={handleSwitchChange}
              name="airconditioning"
              type="switch"
              id="custom-switch"
              label="Aire acondicionado"
            />

          </Col>
        </Row>

        {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

        <div className=" d-grid mb-5 mt-4">
          <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear nueva propiedad'}</Button>
        </div>

      </Form>

    </>
  )
}

export default NewPropertyForm