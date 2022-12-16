import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';
import propertiesService from "../../services/Properties.service"
import { useState } from 'react';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '500px'

};

// recibes locaqqtion por props

function Map({ location, propertiesLocation }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo"
    })



    const [map, setMap] = React.useState(null)

    const MarkeronLoad = (MarkerF) => {
        console.log("marker: ", MarkerF);
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(location, { lat: 0, lng: 0 });
        const zoom = 11
        map.fitBounds(bounds);
        map.setZoom(zoom)
        setMap(map)
    }, [])

    const OPTIONS = {
        minZoom: 4,
        maxZoom: 15,
    }
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/detalles/${id}`)
    }

    return isLoaded && (

        <GoogleMap
            mapContainerStyle={containerStyle}
            location={location}
            onLoad={onLoad}
            onUnmount={onUnmount}
            center={location}
        >
            {propertiesLocation && propertiesLocation.map((elm) => {
                const [lat, lng] = elm.location.coordinates

                return (<MarkerF position={{ lat, lng }} onClick={() => handleClick(elm._id)}
                />)
            })}


        </GoogleMap>

    )
}

export default React.memo(Map)