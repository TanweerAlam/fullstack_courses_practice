/* eslint-disable react/prop-types */
const Country = ({ country }) => {
    console.log("country component rendered...")
    console.log(country)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>
                capital {country.capital}
                <br />
                area { country.area }
            </p>
            <h3>languages:</h3>
            <ul>
                {
                    Object.values(country.languages).map(language => {
                        return <li key={language}>{ language }</li>
                    })
                }
            </ul>
            <img src={country.flags.png} alt="national flag" width="100px" height="auto" />

        </div>
    )
}

export default Country
