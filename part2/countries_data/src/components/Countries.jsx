/* eslint-disable react/prop-types */
import Country from './Country'
import CountriesList from './CountriesList'

const Countries = ({ countries }) => {
    // if (countries.length === 0) {
    //     return <p>No countries found</p>
    // }
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
    if (countries.length > 10) {
        return <p>Too many matches, specify another match</p>
    }
    return <CountriesList countries={countries} />
}

export default Countries
