import { useState, useEffect } from "react"
import PropertiesList from "../../components/PropertiesList/PropertiesList"
import Loader from "../../components/Loader/Loader"
import propertiesService from "../../services/Properties.service"
import { Container, Button } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'


const FilteredPropertiesPage = () => {

  const [properties, setProperties] = useState()
  const [query, setQuery] = useSearchParams()
  const city = query.get('city')
  const capacity = query.get('capacity')
  const from = query.get('from')
  const to = query.get('to')

  const loadProperties = () => {
    propertiesService
      .getFilteredProperties(city, capacity, from, to)
      .then(({ data }) => setProperties(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadProperties()
  }, [])

  console.log(properties)

  return (

    <>
      <Container>
        <h1>Alojamientos disponibles</h1>
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

export default FilteredPropertiesPage