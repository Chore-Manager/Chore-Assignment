// controller for user middleware
const db = require('../model/dbModel');

const jointController = {};

jointController.combineUsersAndChores = async (req, res, next) => {
  try {
    const chores = res.locals.chores;
    const users = res.locals.users;
    res.locals.usersAndChores = {
      chores: chores,
      users: users,
    };
    return next();
  } catch (err) {
    next({
      log: `Error in combineUsersAndChores. Details: ${err}`,
      message: { err: 'An error occurred in combineUsersAndChores' },
    });
  }
};

module.exports = jointController;
