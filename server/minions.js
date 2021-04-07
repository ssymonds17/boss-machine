const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// If params includes minionId, set the req.minion as the minion or send back a 404 status
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// GET all minions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

// GET minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// POST new minion to database
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// PUT request to update minion record
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

// DELETE minion by ID
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
