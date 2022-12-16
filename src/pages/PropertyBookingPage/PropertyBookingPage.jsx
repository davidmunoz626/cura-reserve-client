import BookingCalendar from '../../components/BookingCaledar/BookingCalendar'
import { useEffect, useState } from "react"
import { addDays } from "date-fns";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from "react-bootstrap"
import BookingService from '../../services/Booking.service'
import propertiesService from "../../services/Properties.service"
import Payment from '../../components/Payments/Payments';

const PropertyBookingPage = () => {
  const { property_id } = useParams()

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
      bookedProperty: property_id,
      bookingAmount: undefined
    }
  ]);

  const [property, setProperty] = useState()

  const loadProperty = () => {
    propertiesService
      .getOneProperty(property_id)
      .then(({ data }) => setProperty(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    loadProperty()
  }, [])

  let Totaldays = undefined


  if (property) {
    const { startDate, endDate } = state[0]
    const TotaldaysInMs = new Date(endDate).getTime() - new Date(startDate).getTime()
    Totaldays = (TotaldaysInMs / 86400000)
  }


  useEffect(() => {
    if (property) {
      const stateCopy = { ...state[0] }
      stateCopy.bookingAmount = property.price * Totaldays
      setState([stateCopy])
    }
  }, [property, Totaldays])



  const navigate = useNavigate()

  const handleFormSubmit = e => {
    e.preventDefault()
    BookingService
      .saveBooking(state)
      .then(() => {
        navigate('/profile')
      })
      .catch(err => console.log(err))
  }


  return (
    <Container >
      {
        !property ? <Spinner /> :
          <>
            <h1 className='text-center'>{property.name}</h1>
            <hr />
            <Row>
              <Col md={{ span: 5 }}>

                <BookingCalendar state={state} setState={setState} />
              </Col>


              <Col md={{ span: 5, offset: 1 }}>

                <p>Capacidad: {property.capacity} personas</p>
                <p>Categoría: {property.category}</p>
                <p>Precio por noche: {property.price}€ </p>
                <p>Duracion de la estancia: {Totaldays} noches </p>
                <p> Ciudad: {property.city}</p>
                <p>Extras:</p>
                <ul>
                  <li>Piscina: {property.extras.pool ? '✅' : '❌'}</li>
                  <li>Barbacoa: {property.extras.barbaque ? '✅' : '❌'}</li>
                  <li>Terraza: {property.extras.terrace ? '✅' : '❌'}</li>
                  <li>Wifi: {property.extras.wifi ? '✅' : '❌'}</li>
                  <li>Aire acondicionado: {property.extras.airconditioning ? '✅' : '❌'}</li>
                </ul>
                <hr />
                <h3>Importe total = {property.price * Totaldays} €</h3>

                {/* <Payment amount={property.price * Totaldays} /> */}
                <Link to="/properties">
                  <Button variant="outline-danger" className='me-3 mb-4 mt-2' onClick={handleFormSubmit}>Reservar</Button>
                </Link>
              </Col>

            </Row>
          </>
      }
    </Container >
  )
}
export default PropertyBookingPage