import Map2 from "../../components/Map/Map2";
import PlacesAutocomplete from "../../components/SeachBar/SearchBar";
import { Container } from "react-bootstrap";
import { useState } from "react";
import './LocationSearchPage.css'

const LocationPage = () => {

    // defines location state
    //     pasas por props a cada uno

    const [location, setLocation] = useState()
    const [propertiesLocation, setPropertiesLocation] = useState()
    console.log(location)

    return (
        <Container className="mapa">
            <br />
            <h1>Busqueda por localización</h1>
            <hr />
            <p>Elegir una buena localización es una decisión muy importante, por ello hemos implementado un nuevo motor de busqueda por localización que le ayudará a encontrar la ubicación ideal para su estancia.</p>
            <h4>Selecione una ciudad:</h4>
            <div className="search">
                <PlacesAutocomplete setLocation={setLocation} setPropertiesLocation={setPropertiesLocation} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Map2 location={location} propertiesLocation={propertiesLocation} />
            <br />
        </Container >
    )
}
export default LocationPage