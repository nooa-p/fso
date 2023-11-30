import { useEffect, useState } from "react"
import getAll from './services/countries'
import Search from "./components/Search"
import Country from "./components/Country"

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    getAll().then(response => setCountries(response))
  }, [])

  if(!countries) {
    return <p>stil fetching...</p>
  }

  const changeSearch = (e) => {
    setSearch(e.target.value)
  }

  const preventSubmit = (e) => {
    e.preventDefault()
  }

  const countryFilter = (array) => {
    if (search !== '') {
      const filter = array.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      return filter
    } else {
      return array
    }
  }

  const filtered = countryFilter(countries)
 
  return (
    <div>
      <Search value={search} onChange={changeSearch} default={preventSubmit}/>
      <Country filter={filtered} />
    </div>
  )
}

export default App