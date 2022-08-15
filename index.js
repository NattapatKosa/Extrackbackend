const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(async (req, res, next) => {
    try {
      await mongoose.connect(config.mongodb.uri, {
        user: config.mongodb.username,
        pass: config.mongodb.password,
        retryWrites: true,
      })
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });


app.get('/',(req,res,next) => {
    res.send('hello world');
});

const activityRoutes = require('./routes/activitiesRoute');
app.use('/activities', activityRoutes);

const userRoutes = require('./routes/userRoute');
app.use('/user', userRoutes);

PORT = config.port;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
    // console.log(config.mongodb.uri)
});