import React from 'react'
import NewPropertyForm from '../../components/NewPropertyForm/NewPropertyForm'
import { Container } from 'react-bootstrap'

const NewPropertyPage = () => {
  return (
    <Container>
      <h1>Crear nuevo alojamiento</h1>
      <NewPropertyForm />
    </Container>
  )
}
export default NewPropertyPage