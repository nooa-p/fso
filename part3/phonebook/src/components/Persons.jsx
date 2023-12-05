import Person from './Person'

const Persons = (props) => {
    return (
        props.names.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} onSubmit={() => props.deleteName(person.id)} />)
    )
}

export default Persons;