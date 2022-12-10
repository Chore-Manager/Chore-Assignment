// controller for user middleware
const db = require('../model/dbModel');

const userController = {};

userController.getUsers = async (req, res, next) => {
  try {
    const sqlQuery = 'SELECT * FROM users';
    const result = await db.query(sqlQuery);
    res.locals.users = result.rows;
    return next();
  } catch (err) {
    next({
      log: `Error in userController.getUsers. Details: ${err}`,
      message: { err: 'An error occurred in userController.getUsers' },
    });
  }
};

userController.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    res.locals.newUser = name;
    const sqlQuery = `
    INSERT INTO users (name)
    VALUES ($1)
    `;
    const insertArray = [name];
    const result = await db.query(sqlQuery, insertArray);
    return next();
  } catch (err) {
    next({
      log: `Error in userController.createUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.createUser' },
    });
  }
};

userController.removeUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(name);
    res.locals.removedUser = name;
    const sqlQuery = `
    DELETE FROM users
    WHERE name=$1
    `;
    const insertArray = [name];
    const result = await db.query(sqlQuery, insertArray);
    return next();
  } catch (err) {
    next({
      log: `Error in userController.removeUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.removeUser' },
    });
  }
};

module.exports = userController;
