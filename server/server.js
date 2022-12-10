const path = require('path')
const express = require('express')
// const { send } = require('process')
const cors = require('cors')

// import routers
const choreRouter = require('./routers/choreRouter')
const userRouter = require('./routers/userRouter')

const app = express()
const PORT = 3000

// use cors
app.use(cors())

// handle parsing of request body
app.use(express.json())

// handle static requests - double check with Rachel
app.use(express.static('client'))

// send requests to specific routers
app.use('/chore', choreRouter)
app.use('/user', userRouter)

module.exports = app
