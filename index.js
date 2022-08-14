const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(async (req, res, next) => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI);
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

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});