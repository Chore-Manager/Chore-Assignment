// router for requests to the /user endpoint
const express = require('express');
const { send } = require('process');

// import the controller
const userController = require('../controllers/userController');

const router = express.Router();

// get user - populates user dropdown
router.get('/user', userController.getUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});

// add user - add user to user dropdown
router.post('/user', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

// delete user from user dropdown
router.delete('/user', userController.removeUser, (req, res) => {
  return res.status(200).json();
});

// Get requests to populate all drop downs
// Post request to add a user
// Patch request to add a card to the card list
// Patch request to remove person from chore
// Delete request to remove a card

// Settings (delete stuff from drop down):
// Delete request to remove person, room, chore from dropdown

module.exports = router;
