const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Import million dollar idea check middleware
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// If params includes id, set the req.idea as the idea or send back a 404 status
ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// GET all ideas
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// GET idea by ID
ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

// POST idea to database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// PUT request to update idea record
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

// Delete idea by ID
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
