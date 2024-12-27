import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Filter from "../components/Filter";

import personServices from './services/persons'
import axios from "axios";

const App = () => {
  console.log('App started...');

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newValue, setNewValue] = useState('')

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
      })
      setPersons(persons.filter(person => person.id !== id))
    }
    console.log('not confirmed')
    return
  }

  const filteredPersons = newValue
    ? persons.filter(person => person.name.toLowerCase().includes(newValue.toLowerCase()))
    : persons


  return (
    <div>

      <h2>Phonebook</h2>

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
