const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting
} = require('./db');

// GET all meetings from database
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST new meeting to database
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE all meetings from database
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});
