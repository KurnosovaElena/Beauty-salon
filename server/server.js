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

//Routes
//USER REGISTRSATION
//POST REGISTER
app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res
        .status(201)
        .send({ message: "User created successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating user", success: false, error });
    }
  });
  
  //get registered users
  app.get("/register", async (req, res) => {
    try {
      const users = await User.find();
      res.status(201).send({ message: "User", success: true, users });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting users", success: false, error });
    }
  });

  //login
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .send({ message: "User does not exist", success: false });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ message: "Password is incorrect", success: false });
      }
      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successfull", success: true, data: token });
    } catch (error) {
      res.status(500).send({ message: "Error loggin in", success: false, error });
    }
  });