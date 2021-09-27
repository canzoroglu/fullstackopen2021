require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.static("build"));
app.use(express.json());

const baseUrl = "/api/persons";
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.get("/info", (req, res) => {
  return (
    Person.find({}).then(people => {
      res.send(`<p>Phonebook has info for ${people.length} people</p>
      <p>${new Date()}</p>`);
    })
  );
});
app.get(`${baseUrl}`, (req, res) => {
  Person.find({}).then(people => {
    return res.json(people);
  });
});
app.get(`${baseUrl}/:id`, (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person)
      return res.json(person);
    return res.status(404).end();
  })
    .catch(error => {
      next(error);
    });
});
app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(() => res.status(204).end())
    .catch(error => next(error));
});
app.post(`${baseUrl}`, (req, res, next) => {
  const newName = req.body.name;
  const newNumber = req.body.number;
  if(!newName.trim().match(/^[a-zA-Z]+[a-zA-Z\s]+$/))
    return res.status(400).json({ error: "Name must contain alphabetic chars" });
  else if (!newNumber.trim().match(/^\d+[\s-]?\d+$/))
    return res.status(400).json({ error: "Number must contain numeric chars" });

  const newPerson = new Person({
    name: newName,
    number: newNumber,
  });
  newPerson.save()
    .then(savedPerson => res.status(201).json(savedPerson))
    .catch(err => next(err));

});

app.put(`${baseUrl}/:id`, (req, res, next) => {
  const newNumber = req.body.number;

  if (!newNumber.trim().match(/^\d+[\s-]?\d+$/))
    return res.status(400).json({ error: "Number must contain numeric chars" });

  const updatedPerson = {
    name: req.body.name,
    number: newNumber
  };
  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new:true, runValidators:true })
    .then(updated => res.json(updated))
    .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if(error.name === "CastError")
    return res.status(400).send({ error: "Malformatted id" });
  if(error.name === "ValidationError")
    return res.status(400).send({ error:error.message });
  next(error);
};

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));