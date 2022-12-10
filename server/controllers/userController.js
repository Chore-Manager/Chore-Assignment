// controller for user middleware
const db = require('../model/dbModel');

const userController = {};

userController.getUsers = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM users';
  const result = await db.query(sqlQuery);
  console.log('this is the response after response.json: ', result.rows);
  res.locals.users = result.rows;
  return next();
};

userController.createUser = async (req, res, next) => {
  const { name } = req.body;
  res.locals.newUser = name;
  const sqlQuery = `
    INSERT INTO users (name)
    VALUES ($1)
    `;
  const insertArray = [name];
  const result = await db.query(sqlQuery, insertArray);
  console.log('this is the response: ', result);
  return next();
};

userController.removeUser = async (req, res, next) => {
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
};

module.exports = userController;
