import Person from './Person'

const Persons = (props) => {
    return (
        props.names.map(person => <Person key={person.id} name={person.name} number={person.number} />)
    )
}

export default Persons;