/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
};

//K2's coordinates
const defaultMapCenter = {
    lat: 37.841527,
    lng: -87.578298
}

//Default zoom level, can be adjusted
// const defaultMapZoom = 2

//Map options
const defaultMapOptions = {
    zoomControl: true,
    gestureHandling: 'auto',
};

const MapComponent = ({ markers }: { markers: Array<google.maps.LatLngLiteral> }) => {
    var bounds = new google.maps.LatLngBounds();
    markers.forEach((m) => {
        bounds.extend(m);
    })
    return (
        <div style={{width:"100%", height:"600px"}}>
            <GoogleMap
                onLoad={(map) => map.fitBounds(bounds)}
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                // zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {
                    markers.map((marker, index) => {
                        return <Marker key={marker.lat + `${index}` + marker.lng} position={{ lat: marker.lat, lng: marker.lng }} />
                    })
                }
            </GoogleMap>
        </div>
    )
};

export { MapComponent };