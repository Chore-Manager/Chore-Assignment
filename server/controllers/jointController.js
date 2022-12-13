const jointController = {};

jointController.combineUsersAndChores = async (req, res, next) => {
  // combines the results from getting the chores and getting the users to pass
  //    all data to the front end
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
