import './PropertyCard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import MyCarousel from './MyCarousel';

function PropertyCard({ name, price, _id, image }) {
  return (

    <Card className="card">
      <MyCarousel arrayOfImage={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text> {price} €/noche </Card.Text>
        <Link to={`/detalles/${_id}`}>
          <div className="d-grid">
            <Button variant="dark" size="sm">Ver detalles</Button>
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;