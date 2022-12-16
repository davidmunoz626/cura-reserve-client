import { Container, Col, Row, Card, Button } from "react-bootstrap"
import MyCarousel from "../PropertyCard/MyCarousel"
import bookingService from "../../services/Booking.service"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"

const MyBookings = ({ bookings, loadBookings }) => {


  const deleteBooking = (booking_id) => {
    bookingService
      .delete(booking_id)
      .then(({ data }) => loadBookings())
      .catch(err => console.error(err))
  }

  console.log(bookings)
  return (
    <Container>
      <Row>

        {bookings && bookings.map(elm => {
          return (
            <Col xs={12} md={6} lg={4} key={elm._id} className='mb-4' >
              <Card style={{ width: '21rem' }}>
                <Card.Title className="text-center">{elm.bookedProperty.name}</Card.Title>
                <hr />
                <p>Id de la reserva: {elm._id}</p>
                <p>Precio de la reserva: {elm.bookingAmount}€</p>
                <p>Fecha de entrada: {elm.startDate.slice(0, -14)}</p>
                <p>Fecha de salida: {elm.endDate.slice(0, -14)}</p>
                <MyCarousel arrayOfImage={elm.bookedProperty.image} />

                <Link to="/profile">
                  <Button variant="outline-danger" className='me-3 mb-4 mt-2' onClick={() => deleteBooking(elm._id)}>Cancelar Reserva</Button>
                </Link>
              </Card>

            </Col>
          )
        })}
      </Row>
    </Container >


  )
}

export default MyBookings