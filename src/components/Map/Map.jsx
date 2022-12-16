import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '400px'
};



function MyComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo"
    })

    const position = {
        lat: props.coordinates[0],
        lng: props.coordinates[1]
    };

    const [map, setMap] = React.useState(null)

    const MarkeronLoad = (marker) => {
        console.log("marker: ", marker);
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position);
        const zoom = 15
        map.fitBounds(bounds);
        map.setZoom(zoom)
        setMap(map)
    }, [])
    const OPTIONS = {
        minZoom: 7,
        maxZoom: 15,
    }
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            position={position}
            options={OPTIONS}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <>
            </>
            <MarkerF onLoad={MarkeronLoad} position={position} />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)