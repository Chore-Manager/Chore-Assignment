// router for requests to the /user endpoint
const express = require('express')
const { send } = require('process')

// import the controller
const userController = require('../controllers/userController')

const router = express.Router()

// Get request for entire page
// Get requests to populate all drop downs
// Post request to add a user, chore, room
// Patch request to add a card to the card list
// Patch request to remove person from chore
// Delete request to remove a card

// Settings (delete stuff from drop down):
// Delete request to remove person, room, chore from dropdown

module.exports = router
