import { Container, Col, Row } from "react-bootstrap"
import PropertyCard from "../PropertyCard/PropertyCard"

const PropertyList = ({ properties }) => {

  return (
    <Container>
      <Row>

        {properties.map(elm => {
          return (
            <Col xs={12} md={6} lg={4} key={elm._id} className='mb-4' >
              <PropertyCard {...elm} />
            </Col>
          )
        })}
      </Row>
    </Container >
  )
}

export default PropertyList