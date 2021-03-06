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

const locations = [{
    id: 1,
    country: 'pk',
    city: 'islamabad',
    zip: 44220,
    name: 'Centaurus',
    address: 'Search Results, F8/4 Jinnah Avenue, F 8/4 F-8, Islamabad, Islamabad Capital Territory 44220',
    coords: {
        lat: 33.7077,
        long: 73.0501
    }
}, {
    id: 2,
    country: 'pk',
    city: 'islamabad',
    zip: 44220,
    name: 'DHA Phase 2',
    address: 'The Best Address',
    coords: {
        lat: 33.5368,
        long: 73.1645
    }
}, {
    id: 3,
    country: 'pk',
    city: 'rawalpindi',
    zip: 44220,
    name: 'Bahria 8',
    address: 'The Best Address',
    coords: {
        lat: 33.4786,
        long: 73.0789
    }
}]

const NearbyCentersComponent = (props) => {

    console.log(props);

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
    let [selectedArea, setSelectedArea] = useState({
        city: '',
        country: ''
    })


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
        const button = (<button className="btn btn-light w-100" onClick={e => {
            mapsSelector(position)
        }}><i className="fas fa-map-marker-alt mr-2 t-color"></i>Open In Google Maps</button>);
        const button2 = (<button onClick={() => window.open('tel:1234567890')} className="btn btn-dark w-100 mt-2">Phone Number</button>);
        ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
        ReactDOM.render(React.Children.only(button2), document.getElementById("iwc2"));
    }

    const mapsSelector = (position) => {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPad") != -1) ||
            (navigator.platform.indexOf("iPod") != -1))
            window.open(`maps://maps.google.com/maps?daddr=${position.lat},${position.lng}&amp;ll=`);
        else window.open(`https://maps.google.com/maps?daddr=${position.lat},${position.lng}&amp;ll=`);
    }

    useEffect(() => {
        if (localStorage.getItem('area')) {
            setSelectedArea(selectedArea = JSON.parse(localStorage.getItem('area')));
            console.log(selectedArea);
        }

    }, [])

    return (
        <Fragment>
            <Map
                google={props.google}
                zoom={10}
                style={mapStyles}
                onClick={onMapClicked}
                initialCenter={{ lat: DEF_LAT, lng: DEF_LONG }}
            >

                {locations.filter((loc) => loc.country === selectedArea.country && loc.city === selectedArea.city).map((loc) => {
                    return (<Marker key={loc.id} onClick={onMarkerClick}
                        name={loc.name}
                        address={loc.address}
                        position={{ lat: loc.coords.lat, lng: loc.coords.long }}
                    />)
                })}

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
                        <div id="iwc2" />
                    </div>
                </InfoWindow>
            </Map>
        </Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_ID
})(NearbyCentersComponent)
