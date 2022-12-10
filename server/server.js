const path = require('path');
const express = require('express');
// const { send } = require('process')
const cors = require('cors');

// import routers
const choreRouter = require('./routers/choreRouter');
const userRouter = require('./routers/userRouter');
const choreController = require('./controllers/choreController');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

// use cors
app.use(cors());

// handle parsing of request body
app.use(express.json());

// handle static requests - double check with Rachel
app.use(express.static('client'));

app.get(
  '/choresAndUsers',
  choreController.getChores,
  // userController.getUsers,
  (req, res) => {
    return res.status(200).json(res.locals.usersAndChores);
  }
);

// send requests to specific routers
app.use('/chore', choreRouter);
app.use('/user', userRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
