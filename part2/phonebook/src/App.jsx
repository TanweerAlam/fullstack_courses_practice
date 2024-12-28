import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Filter from "../components/Filter";

import personServices from './services/persons'
import axios from "axios";
import Notification from "../components/Notification";

const App = () => {
  console.log('App started...');

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newValue, setNewValue] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect...')

    personServices
      .getAll()
      .then(response => {
        console.log('promise fulfilled...')
        console.log(response.data)
        setPersons(response.data)
      })

  }, [])
  console.log('render...', persons.length, 'persons')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personFound = persons.find(person => person.name === newName)

    if (personFound && personFound.number !== newNumber){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...personFound, number: newNumber}
        personServices
          .update(personFound.id, updatedPerson)
          .then(response => {
            console.log('updating person with', response.data)
            setPersons(persons.map(person => person.id !== personFound.id ? person : response.data))

            setMessage(`Updated ${updatedPerson.name}'s number`)
            notificationTimeout()
          })
          .catch(error => {
            setMessage(`Could not update ${updatedPerson.name}'s number!`)
            notificationTimeout()
          })
        setNewName('')
        setNewNumber('')
        return
      }
    }
    else if (personFound){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number: newNumber}

    personServices
      .create(newPerson)
      .then(respone => {
        // console.log(respone.data)
        setPersons(persons.concat(respone.data))
        setMessage(`Added ${newPerson.name}`)
        notificationTimeout()
      })
      .catch(error => {
        setMessage("Something went wrong while saving the new person!")
        notificationTimeout()
      })

    setNewName('')
    setNewNumber('')

    console.log('form submitted')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewValue(event.target.value)
  }

  const handleDelete = (id) => {
    const deletingPerson = persons.find(p => p.id === id) // find the person object with given id

    if (window.confirm(`Delete ${deletingPerson.name} ?`)) {
      console.log('confirmed')
      personServices
      .deletePerson(id)
      .then(response => {
        console.log('delete response', response.status)
        setMessage(`Deleted ${deletingPerson.name}`)
        notificationTimeout()
      })
      .catch(error => {
        setMessage(`Information of ${deletingPerson.name} has already been removed from server`)
        notificationTimeout()
      })
      setPersons(persons.filter(person => person.id !== id))
    }
    console.log('not confirmed')
    return
  }

  const notificationTimeout = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const filteredPersons = newValue
    ? persons.filter(person => person.name.toLowerCase().includes(newValue.toLowerCase()))
    : persons

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter value={newValue} onChange={handleFilterChange} />

      <h3>Add a New</h3>

      <PersonForm handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />

    </div>
  )
}

export default App
