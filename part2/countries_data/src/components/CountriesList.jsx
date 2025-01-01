import { useState } from "react"
import Country from "./Country"
import ShowButton from "./ShowButton"

/* eslint-disable react/prop-types */
const CountriesList = ({ countries }) => {
    const [show, setShow] = useState(null)

    if (show) {
        return <Country country={show} />
    }
    return (
        <ul>
            {
                countries.map(country =>
                    <li key={country.cca3}>
                        {country.name.common}
                        <ShowButton show={show} setShow={setShow} country={country} />
                    </li>
                )
            }
        </ul>
    )
}

export default CountriesList
