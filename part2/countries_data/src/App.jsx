import { useEffect, useState } from "react"
import Countries from "./components/Countries"

const App = ()=>{
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const fetchCountries = () => {
    if (search.length) {
      fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setCountries(data)
        })
        .catch(error => console.log(error))
    }
  }

  useEffect(fetchCountries, [search])

  const countriesToShow = search.length
    ? countries.filter(country => {
      const name = country.name.common.toLowerCase()
      return name.includes(search.toLowerCase())
    })
    : countries

    return (
        <div>
          <label htmlFor="country_name">find countries</label>
          <input
            id="country_name"
            value={search}
            onChange={(event) => setSearch(event.target.value)} type="text"
          />

          <Countries countries={countriesToShow} />
        </div>
    )
}

export default App
