import { useState, useEffect } from 'react'
import nameService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      number: newNumber
    }
    if (persons.some((e) => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        nameService
          .changeNumber(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.name !== newName ? person : response))
            setAddedMessage(`Changed ${newName}`)
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      nameService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setAddedMessage(`Added ${newName}`)
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deleteName = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      nameService
        .deleteThis(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
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
      <Notification message={addedMessage} className='notif' />
      <Notification message={errorMessage} className='error' />
      <Filter filter={filter} onChange={filterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} nameChange={nameChange} numberChange={numberChange} />
      <h3>Numbers</h3>
      <Persons names={namesToShow} deleteName={deleteName} />
    </div>
   )
}

export default App