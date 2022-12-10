// controller for user middleware
const db = require('../model/dbModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { name } = req.body;
  const sqlQuery = `
    INSERT INTO users (name)
    VALUES ($1)
    `;
  const insertArray = [name];
  db.query(sqlQuery, insertArray);
};

module.exports = userController;
