const db = require('../model/dbModel');

const choreController = {
  // middleware to get all chores from the db
  getChores: (req, res, next) => {
    const text = `SELECT id, chore, room, assigned_user_id 
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

  // add a chore to the database
  addChore: (req, res, next) => {
    const { chore, room } = req.body;
    const values = [chore, room];

    const text = `INSERT INTO chores
    (chore, room)
    VALUES ($1, $2);`;

    db.query(text, values)
      .then(() => {
        res.locals.newChore = { chore, room };
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
  // TODO: edit front end to send the chore id and the user id, allows us to do this with one query
  updateChore: (req, res, next) => {
    const { choreID, userID, assign } = req.body;
    // check if assign is true or false
    // get the chore with the matching choreName and room,
    // get the name that matches the given userName
    // assign the userName ID to the assigned user ID value on the chore
    // if we are assigning a user, we get the user id, if not, we are setting the assigned id to be an empty string
    let userIDOption = null;
    res.locals.response = `unassigned chore# ${choreID}`;
    if (assign) {
      userIDOption = userID;
      res.locals.response = `assigned chore# ${choreID} to user# ${userID}`;
    }

    const text = `UPDATE chores
    SET assigned_user_id=$1
    WHERE ID=$2;`;

    const values = [userIDOption, choreID];
    // second query to update the assigned user in the chore table
    db.query(text, values)
      .then(() => {
        console.log('successfully assigned chore');
        return next();
      })
      .catch((error) => {
        return next({
          log: 'error when updating chore in updateChore in choreController',
          message: `error: ${error}`,
        });
      });
  },
  deleteChore: (req, res, next) => {
    const { choreID } = req.body;
    const text = `DELETE FROM chores
    WHERE ID=$1`;
    const values = [choreID];
    db.query(text, values)
      .then(() => {
        res.locals.response = `deleted ${choreID} from the DB.`;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'error in deleteChore in choreController',
          message: `error: ${error}`,
        });
      });
  },
};

module.exports = choreController;
