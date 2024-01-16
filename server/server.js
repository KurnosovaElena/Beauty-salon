const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require('moment')

const SECRET_KEY = 'super-secret-key'

//connect to express app
const app = express();

//connect to MongoDB
const dbURL =
  "mongodb+srv://kurnosovaelena04:jj4iTLIsgA6cdK9u@cluster.ysd5oma.mongodb.net/beauty-salon";
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Connected 3001 Mongo");
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

//middkeware
app.use(bodyParser.json());
app.use(cors());