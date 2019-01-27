const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// these are the different routes
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const app = express()

// Body Parser middle ware layer
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// DB configuration
const db = require('./config/keys').mongoURI

// Connect to the database
mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log('MongoDB is connected...'))
        .catch(err => console.log(err))


// Passport middle ware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`))