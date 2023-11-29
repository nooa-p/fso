import { useState, useEffect } from 'react'
import nameService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const namesToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons

  const addName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      nameService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const nameChange = (e) => {
    setNewName(e.target.value)
  }

  const numberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const filterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={filterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} nameChange={nameChange} numberChange={numberChange} />
      <h3>Numbers</h3>
      <Persons names={namesToShow} />
    </div>
   )
}

export default App