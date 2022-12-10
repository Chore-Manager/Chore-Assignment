const db = require('../model/dbModel');

const choreController = {
  // middleware to get all chores from the db
  getChores: (req, res, next) => {
    const text = `SELECT * 
    FROM chores;`;
    // query the db to get all chores
    db.query(text)
      .then((data) => {
        res.locals.chores = data.rows;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'error in getChores method in choreController',
          message: { error },
        });
      });
  },

  // filter chores down to the room
  filterByRoom: (req, res, next) => {},

  // add a chore to the database
  addChore: (req, res, next) => {
    const { choreName, room } = req.body;
    const values = [choreName, room];
    const text = `INSERT INTO chores
    (chore, room)
    VALUES ($1, $2);`;

    db.query(text, values).then((data) => {});
  },

  // assign a chore to a user
  updateChore: (req, res, next) => {},
};

module.exports = choreController;
