import React, {useState} from 'react' 

const Persons = ({persons}) => (
  persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
)

const Filter = ({text, onChange}) => <p>filter shown with: <input onChange={onChange} value={text}/></p>

const PersonForm = ({onSubmit, onNameChange, onNumberChange, name, number}) => (
  <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onNameChange} value={name} />
          number: <input onChange={onNumberChange} value={number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.find(person => person.name === newName))
      alert(`${newName} is already added to phonebook`)
    else setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName("")
    setNewNumber("")
    setFilter("")
  }

  const peopleToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
       <Persons persons={peopleToShow} />
    </div>
  )
}


export default App