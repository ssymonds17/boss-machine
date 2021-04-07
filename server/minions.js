const minionsRouter = require('express').Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./db');

module.exports = minionsRouter;
