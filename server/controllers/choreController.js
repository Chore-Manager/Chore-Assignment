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
    let userID;
    const userNameQuery = `SELECT ID 
    FROM users
    WHERE name=$1;`;
    const userNameValue = [userName];
    // first query to get the user ID based on the user name
    db.query(userNameQuery, userNameValue)
      .then((data) => {
        userID = data.rows[0].id;
      })
      .then(() => {
        const choreQuery = `UPDATE chores 
        SET assigned_user_id=$1
        WHERE chore=$2 AND room=$3;`;

        const choreValues = [userID, choreName, room];
        // second query to update the assigned user in the chore table
        db.query(choreQuery, choreValues)
          .then(() => {
            return next();
          })
          .catch((error) => {
            return next({
              log: 'error when updating chore in updateChore in choreController',
              message: `error: ${error}`,
            });
          });
      });
  },
};

module.exports = choreController;
