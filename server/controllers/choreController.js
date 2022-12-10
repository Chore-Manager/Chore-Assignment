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
    const { name, room } = req.body;
    const values = [name, room];
    const text = `INSERT INTO chores
    (chore, room)
    VALUES ($1, $2);`;

    db.query(text, values)
      .then(() => {
        res.locals.newChore = { name, room };
        return next();
      })
      .catch((error) => {
        return next({
          log: 'error in addChore method in choreController',
          message: { error },
        });
      });
  },

  // assign a chore to a user
  updateChore: (req, res, next) => {
    const { choreName, userName, room } = req.body;
    // get the chore with the matching choreName and room,
    // get the name that matches the given userName
    // assign the userName ID to the assigned user ID value on the chore

    const text = `UPDATE chores 
    LEFT JOIN users
    ON chores 
    SET (assigned_user_id=)`;
  },
};

module.exports = choreController;
