const mongoose = require('mongoose');

const app = require('./api/index');

const config = require('./config/config');

const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    retryWrites: true
  });
  // Start express server
  PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

boot();



// PORT = config.port;

// app.listen(PORT, () => {
//   console.log("listening on port " + PORT);
//   // console.log(config.mongodb.uri)
// });
