import SingleCountry from "./SingleCountry"

const Country = (props) => {
    if (props.filter.length > 10) {
        return <span>Too many matches, specify another filter</span>
    } else if (props.filter.length <= 10 && props.filter.length > 1) {
        return props.filter.map((country) => {
        return (
            <SingleCountry key={country.name.common} country={country} />
        )})
    } else if (props.filter.length === 1) {
        return (
            <SingleCountry country={props.filter[0]} className='show' />
        )
    } else {
        return <span>Search returned no countries</span>
    }
}

export default Country