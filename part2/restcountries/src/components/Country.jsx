const Country = (props) => {
    if (props.filter.length > 10) {
        return <span>Too many matches, specify another filter</span>
    } else if (props.filter.length <= 10 && props.filter.length > 1) {
        return props.filter.map((country) => <span key={country.name.common}>{country.name.common} <br /></span>)
    } else  if (props.filter.length === 1) {
        return (
            <div>
                <h2>{props.filter[0].name.common}</h2>
                <div>
                    capital {props.filter[0].capital} <br />
                    area {props.filter[0].area}
                </div>
                <div>
                    <h4>languages:</h4>
                    <ul>
                        {Object.keys(props.filter[0].languages).map(key => <li key={key}>{props.filter[0].languages[key]}</li>)}
                    </ul>
                </div>
                <img src={props.filter[0].flags.png} height='150px' />
            </div>
        )
    } else {
        return <span>Search returned no countries</span>
    }
}

export default Country