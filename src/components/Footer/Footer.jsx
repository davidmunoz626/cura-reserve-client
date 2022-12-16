import './Footer.css'
import { Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <Container >
        <Row>
          <Col xs={12} md={6} lg={3}>
            <h3 className='footerTitle'>Ayuda</h3>
            <ul className='footerUl'>
              <li><Link to="#" className='footerlinks'>Ayuda</Link></li>
              <li><Link to="#" className='footerlinks'>Mis reservas</Link></li>
              <li><Link to="#" className='footerlinks'>Métodos de Pago</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h3 className='footerTitle'>Unete a nosotros</h3>
            <ul className='footerUl'>
              <li><Link to="#" className='footerlinks'>Alquila con nosotros</Link></li>
              <li><Link to="#" className='footerlinks'>Afiliate a Cura Reserve</Link></li>
              <li><Link to="#" className='footerlinks'>Publicidad</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h3 className='footerTitle'>Sobre nosotros</h3>
            <ul className='footerUl'>
              <li><Link to="#" className='footerlinks'>Sobre nosotros</Link></li>
              <li><Link to="#" className='footerlinks'>Marca</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h3 className='footerTitle'>Github</h3>
            <ul className='footerUl'>
              <li><a className='footerlinks' href="https://github.com/J2PQ">David Daganzo</a></li>
              <li><a className='footerlinks' href="https://github.com/davidmunoz626">David Muñoz</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>

  )
}

export default Footer