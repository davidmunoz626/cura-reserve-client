import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <Spinner animation="border" role="status" style={{ color: "pink" }}>
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
  );
}

export default Loader