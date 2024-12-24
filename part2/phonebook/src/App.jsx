import { useState } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Filter from "../components/Filter";

const App = () => {
  console.log('App started...');

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newValue, setNewValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const people = [...persons, {name: newName, number: newNumber, id: persons.length + 1}]
    setPersons(people)
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

      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App
