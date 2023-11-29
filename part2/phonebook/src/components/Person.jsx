const Person = (props) => {
    return <p>{props.name} {props.number} <button id={props.id} onClick={props.onSubmit}>delete</button></p>
}

export default Person;