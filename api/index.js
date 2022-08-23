const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require('../config/config')
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());


if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongodb.uri, {
      user: config.mongodb.username,
      pass: config.mongodb.password,
      retryWrites: true
    }); 
    return next();
    
  });
}


app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", 1);

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "asdjfklasdjklfjasldkjflkjlkasjlkfjldkasjflkajlskdf",
    saveUninitialized: false,
    //   cookie: {
    //     origin: [
    //       "http://localhost:5173"
    //     ],
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none"
    //   },
    cookie: { maxAge: oneDay, secure: true, httpOnly: true, sameSite: "none" },
    resave: false,
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req, res, next) => {
  res.send("hello world");
});

// pathway = /auth/
const authRoutes = require("../routes/authRoute");
app.use("/auth", authRoutes);

//  pathway = /user/activities
const userRoutes = require("../routes/userRoute");
app.use("/user", userRoutes);

module.exports = app;