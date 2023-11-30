import { useState } from "react"

const SingleCountry = (props) => {
    const [show, setShow] = useState('hidden')

    const buttonClick = () => {
        setShow('show')
    }
    return (
        <>
        <span>{props.country.name.common} <button onClick={buttonClick}>show</button> <br /></span>
        <div className={show}>
            <h2>{props.country.name.common}</h2>
            <div>
                capital {props.country.capital} <br />
                area {props.country.area}
            </div>
            <div>
                <h4>languages:</h4>
                <ul>
                    {Object.keys(props.country.languages).map(key => <li key={key}>{props.country.languages[key]}</li>)}
                </ul>
            </div>
            <img src={props.country.flags.png} height='150px' />
        </div>
        </>
    )
}

export default SingleCountry