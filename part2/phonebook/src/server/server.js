const express = require('express')
const cors = require("cors");
const app = express()
const port = 3001

const corsOptions = {
    origin: 'http://localhost:3000'
  }

app.use(cors(corsOptions));
app.use(express.json());

const data = {
    "persons":[
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }
  
let id = 5

app.get('/persons', (req, res) => {
  res.json(data)
})

app.post('/persons', (req, res) => {
  const newData = {...req.body, id:id++}
  data.persons.push(newData)
  res.json(newData)
})

app.put('/persons/:id', (req, res) => {
  const newData = data.persons.map(person =>{ 
    if(person.id == req.params.id) {
      person.number = req.body.number
      return person
    }
    else return person
  })
  res.json(newData)
})

app.delete('/persons/:id', (req, res) => {
  res.json(data.persons.filter(person => person.id != req.params.id))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})