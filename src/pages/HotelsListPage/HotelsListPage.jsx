import { useState, useEffect } from "react"
import PropertiesList from "../../components/PropertiesList/PropertiesList"
import Loader from "../../components/Loader/Loader"
import propertiesService from "../../services/Properties.service"
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const HotelsListPage = () => {

  const [properties, setProperties] = useState()



  const loadProperties = () => {
    propertiesService
      .getHotels()
      .then(({ data }) => setProperties(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadProperties()
  }, [])

  return (

    <>
      <Container>
        <h1>Hoteles disponibles</h1>
        <hr />
        {!properties ? <Loader /> : <PropertiesList properties={properties} />}
        <hr />
        <Link to="/">
          <Button className="mb-3" variant="dark">Volver a inicio</Button>
        </Link>
      </Container>

    </>


  )
}

export default HotelsListPage