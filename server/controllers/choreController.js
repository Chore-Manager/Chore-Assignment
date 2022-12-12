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
  updateChore: async (req, res, next) => {
    const { chore, name, room, assign } = req.body;
    // check if assign is true or false
    // get the chore with the matching choreName and room,
    // get the name that matches the given userName
    // assign the userName ID to the assigned user ID value on the chore
    let userID;
    // if we are assigning a user, we get the user id, if not, we are setting the assigned id to be an empty string
    if (assign === true) {
      console.log('asssign status: ', assign);
      const userNameQuery = `SELECT ID 
      FROM users
      WHERE name=$1;`;
      const userNameValue = [name];
      // first query to get the user ID based on the user name
      await db
        .query(userNameQuery, userNameValue)
        .then((data) => {
          userID = data.rows[0].id;
          console.log('user ID', userID);
        })
        .catch((error) => {
          return next({
            log: 'error when getting userID in updateChore in choreController',
            message: `error: ${error}`,
          });
        });
    }
    const choreQuery = `UPDATE chores 
    SET assigned_user_id=$1
    WHERE chore=$2 AND room=$3;`;
    console.log('user ID after first query: ', userID);
    const choreValues = [userID, chore, room];
    // second query to update the assigned user in the chore table
    await db
      .query(choreQuery, choreValues)
      .then(() => {
        console.log('successfully assigned chore');
        res.locals.response = `assigned ${chore} to ${name}`;
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
    const { chore, room } = req.body;
    const text = `DELETE FROM chores
    WHERE chore=$1 AND room=$2;`;
    const values = [chore, room];
    db.query(text, values)
      .then(() => {
        res.locals.response = `deleted ${chore} in ${room} from the DB.`;
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
