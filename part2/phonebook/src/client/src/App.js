import React, {useState, useEffect} from 'react' 
import peopleService from './services/people'

const Persons = ({persons, handleDelete}) => {
  return persons.map(person => <p key={person.name}>
    {person.name} {person.number} 
    <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>)
}

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

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )
}

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [message, setMessage] = useState('')
  const [notificationStatus, setNotificationStatus] = useState('')

  

  useEffect(() => {
    peopleService.getPeople().then(res => setPersons(res)).catch(err => console.error(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newData = {name: newName, number: newNumber}
        const id = persons.filter(person => person.name === newName)[0].id
        peopleService.updateData(`http://localhost:3001/persons/${id}`, newData)
        .then(res => {
          setPersons(res)
          setMessage(`Updated ${newData.name}`)
          setNotificationStatus("success")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(err => console.error(err))
      }
    }
    else {
      const newData = {name: newName, number: newNumber}
      peopleService.postData("http://localhost:3001/persons", newData)
      .then(res => {
        setPersons(persons.concat(res))
        setMessage(`Added ${newData.name}`)
        setNotificationStatus("success")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(err => console.error(err))
    }
    setNewName("")
    setNewNumber("")
    setFilter("")
  }

  const handleDelete = id => {
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}?`)) {
      peopleService.deleteData(`http://localhost:3001/persons/${id}`)
      .then(res => setPersons(res))
      .catch(err => console.error(err))
    }
  }

  const peopleToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={notificationStatus}/>
      <Filter text={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
       <Persons persons={peopleToShow} handleDelete={handleDelete}/>
    </div>
  )
}


export default App