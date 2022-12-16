import React, { useContext, useState, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import MyBookings from '../../components/MyBookings/MyBookings'
import { AuthContext } from '../../context/auth.context'
import bookingService from '../../services/Booking.service'

const MyProfilePage = () => {

  const { user, setUser } = useContext(AuthContext)
  const [bookings, setBookings] = useState()


  const loadBookings = () => {
    bookingService
      .myBooking(user._id)
      .then(({ data }) => {
        console.log(data)
        setBookings(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadBookings()

  }, [])


  return (

    <Container>
      <Row>
        <Col>
          <div>
            <h1>{user.username}</h1>
            <hr />
            <h3>Estas son tus reservas:</h3>
            <br />
          </div>
          <MyBookings bookings={bookings} loadBookings={loadBookings} />
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfilePage