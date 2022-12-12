// router for requests to the /chore endpoint
const express = require('express');
const choreController = require('../controllers/choreController');
const router = express.Router();

// get requests to chore would be for populating the chore dropdown
router.get('/', choreController.getChores, (req, res) => {
  return res.status(200).json(res.locals.chores);
});

// post requests for chore would be to add to the chore table in the db
router.post('/', choreController.addChore, (req, res) => {
  return res.status(200).json(res.locals.newChore);
});

// patch requests to chore would be for assigning new chores to a user
// router.patch('/', choreController.updateChore, (req, res) => {
//   return res.status(200).json(res.locals.response);
// });

// delete requests to chore should remove the row from the database
router.delete('/', choreController.deleteChore, (req, res) => {
  return res.status(200).json(res.locals.response);
});

module.exports = router;
