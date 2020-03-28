import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const DEF_LAT = 33.6844;
const DEF_LONG = 73.0479;
const mapStyles = {
    width: '100%',
    height: '91%'
};

const styles = {
    infoWindow: {
        width: '100%',
        height: '91%'
    }
}

const NearbyCentersComponent = (props) => {

    let [location, setLocation] = useState({});
    let [showingInfoWindow, setShowingInfoWindow] = useState(false);
    let [activeMarker, setActiveMarker] = useState({});
    let [selectedPlace, setSelectedPlace] = useState({
        name: '',
        address: '',
        position: {
            lat: 0,
            lng: 0
        }
    });

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(selectedPlace = props);
        setActiveMarker(activeMarker = marker);
        setShowingInfoWindow(showingInfoWindow = true)
    }


    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setActiveMarker(activeMarker = null);
            setShowingInfoWindow(showingInfoWindow = false)
        }
    };

    const onInfoWindowOpen = (props, e, position) => {
        const button = (<button className="btn btn-success w-100" onClick={e => {
            mapsSelector(position)
        }}>Open In GMaps</button>);
        ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
    }

    const mapsSelector = (position) => {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPad") != -1) ||
            (navigator.platform.indexOf("iPod") != -1))
            window.open(`maps://maps.google.com/maps?daddr=${position.lat},${position.lng}&amp;ll=`);
        else window.open(`https://maps.google.com/maps?daddr=${position.lat},${position.lng}&amp;ll=`);
    }

    useEffect(() => {
        (window.navigator.geolocation.getCurrentPosition((data) => {
            setLocation(location = {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            })
        }, (error) => {
            console.log(error)
        }))
    }, [])

    return (
        <Fragment>
            <Map
                google={window.google}
                zoom={10}
                style={mapStyles}
                onClick={onMapClicked}
                initialCenter={{ lat: DEF_LAT, lng: DEF_LONG }}
                center={{ lat: location.latitude, lng: location.longitude }}
            >
                <Marker onClick={onMarkerClick}
                    name={'CMH Hospital'}
                    address={'The best hospital ever in this district'}
                    position={{ lat: 30.3753, lng: 69.3451 }} />

                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    onOpen={(e) => {
                        onInfoWindowOpen(props, e, selectedPlace.position);
                    }}
                >
                    <div>
                        <h5>{selectedPlace.name}</h5>
                        <hr />
                        <div><b>Coordinates:</b></div>
                        <div className="text-success text-success font-weight-bold">{selectedPlace.position.lat}, {selectedPlace.position.lng}</div>
                        <br />
                        <div><b>Address:</b></div>
                        <div>{selectedPlace.address}</div>
                        <br />
                        <div id="iwc" />
                        {/* <button className="w-100 btn btn-success" onClick={e => alert(e.target.value)}>Open G Maps</button> */}
                    </div>
                </InfoWindow>
            </Map>
        </Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_ID
})(NearbyCentersComponent)
