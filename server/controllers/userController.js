// controller for user middleware
const db = require('../model/dbModel');

const userController = {};

userController.getUsers = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM user';
  let response = await db.query(sqlQuery);
  response = await response.json();
  console.log('this is the response after response.json: ', response);
  res.locals.users = response;
};

userController.createUser = async (req, res, next) => {
  const { name } = req.body;
  const sqlQuery = `
    INSERT INTO users (name)
    VALUES ($1)
    `;
  const insertArray = [name];
  db.query(sqlQuery, insertArray);
};

userController.removeUser = async (req, res, next) => {};

module.exports = userController;
