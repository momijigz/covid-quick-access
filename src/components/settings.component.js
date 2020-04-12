import React, { useState, useEffect } from 'react'
import cities from '../testDB/cities';
import countries from '../testDB/countries';


const SettingsComponent = () => {


    useEffect(() => {
        if (localStorage.getItem('area')) {
            setSelectedCity(selectedCity = JSON.parse(localStorage.getItem('area')).city);
            setSelectedCountry(selectedCountry = JSON.parse(localStorage.getItem('area')).country);
        }
    }, [])


    let [isCountrySelected, setIsCountrySelected] = useState(true);
    let [selectedCountry, setSelectedCountry] = useState('');
    let [selectedCity, setSelectedCity] = useState('');

    let selectCountry = (country) => {
        if (country === 'sc') {
            setSelectedCountry(selectCountry = country);
            return setIsCountrySelected(isCountrySelected = true);
        }
        else {
            setSelectedCountry(selectCountry = country);
            setIsCountrySelected(isCountrySelected = false);
        }

    }

    const handleSubmit = () => {
        localStorage.setItem('area', JSON.stringify({
            country: selectedCountry,
            city: selectedCity
        }))
    }

    return (
        <div className="container pt-4">
            <div className="c-h1 text-center">
                Settings
            </div>
            <div className="row justify-content-md-center">
                <div className="col-sm-12 col-md-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <form>
                                <h5>Set Your Country & City</h5>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <select className="form-control" id="country" value={selectedCountry} onChange={(e) => selectCountry(e.target.value)} >
                                        {
                                            countries.map(country => <option key={country.id} value={country.value}>{country.name}</option>)}
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <select className="form-control" id="city" value={selectedCity} onChange={(e) => setSelectedCity(selectedCity = e.target.value)} disabled={isCountrySelected}>
                                        <option defaultValue>Select City</option>
                                        {
                                            cities.filter((city) => city.countryAbbr === selectedCountry).map((city) => <option key={city.id} value={city.value}>{city.name}</option>)
                                        }
                                    </select>
                                </div>
                            </form>
                            <button onClick={handleSubmit} className="btn btn-dark w-100">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsComponent
