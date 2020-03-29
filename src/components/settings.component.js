import React, { useState } from 'react'

const SettingsComponent = () => {

    const countries = [{
        id: '0',
        name: 'Select Country',
        value: 'selectCountry',
        abbr: 'sC'
    }, {
        id: '1',
        name: 'Pakistan',
        value: 'pakistan',
        abbr: 'PK'
    },
    {
        id: '2',
        name: 'Turkey',
        value: 'turkey',
        abbr: 'tr'
    }]

    const cities = [
        {
            id: '1',
            name: 'Islamabad',
            value: 'islamabad',
            zip: 46000,
            countryVal: 'pakistan',
            countryAbbr: 'PK',
            latitude: 33.6844,
            longitude: 73.0479
        },
        {
            id: '2',
            name: 'Rawalpindi',
            value: 'rawalpindi',
            zip: 46000,
            countryVal: 'pakistan',
            countryAbbr: 'PK',
            latitude: 33.5651,
            longitude: 73.0169
        },
        {
            id: '3',
            name: 'Lahore',
            value: 'lahore',
            zip: 44000,
            countryVal: 'pakistan',
            countryAbbr: 'PK',
            latitude: 31.5204,
            longitude: 74.3587
        },
        {
            id: '4',
            name: 'Istanbul',
            value: 'istanbul',
            zip: 44000,
            countryVal: 'turkey',
            countryAbbr: 'TR',
            latitude: 31.5204,
            longitude: 74.3587
        }]

    let [isCountrySelected, setIsCountrySelected] = useState(true);
    let [selectedCountry, setSelectedCountry] = useState({});

    let selectCountry = (country) => {
        if (country === 'selectCountry') {
            setSelectedCountry(selectCountry = country);
            return setIsCountrySelected(isCountrySelected = true);
        }
        else {
            setSelectedCountry(selectCountry = country);
            setIsCountrySelected(isCountrySelected = false);
        }

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
                                    <label for="country">Country</label>
                                    <select className="form-control" id="country" value={selectedCountry} onChange={(e) => selectCountry(e.target.value)} >
                                        {
                                            countries.map(country => <option key={country.id} value={country.value}>{country.name}</option>)}
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="city">City</label>
                                    <select className="form-control" id="city" disabled={isCountrySelected}>
                                        {
                                            cities.filter((city) => city.countryVal === selectedCountry).map((city) => <option key={city.id} value={city.value}>{city.name}</option>)
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsComponent
