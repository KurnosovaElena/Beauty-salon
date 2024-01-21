const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
const Master = require("./models/masterSchema");
const Appointment = require("./models/appointmentSchema");
const authMiddleware = require("./middlewares/authMiddleware");
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

//middleware
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

app.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    user.password = undefined; 
    if (!user) {
      return res
      .status(200)
      .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error getting user info", success: false, error });
    
  }
});

app.get("/get-all-users",authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send({ message: "User", success: true, data: users });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting users", success: false, error });
  }
});

app.get("/get-all-masters",authMiddleware, async (req, res) => {
  try {
    const masters = await Master.find({});
    res.status(201).send({ message: "User", success: true, data: masters });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting users", success: false, error });
  }
});

app.post("/apply-master-account", authMiddleware, async (req, res) => {
  try {
    const newMaster = new Master({...req.body , status: "pending"})
    await newMaster.save();
    const adminUser = await User.findOne({ isAdmin: true})

    const unseenNotifications = adminUser.unseenNotifications
    unseenNotifications.push({
      type: "new-master-request",
      message : `Пользователь ${newMaster.firstName} ${newMaster.lastName} подал заявку на становление мастером`,
      data : {
        masterId: newMaster._id,
        name: newMaster.firstName + " " + newMaster.lastName
      },
      onсlickPath : "/admin/masters"
    })
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({ message: "Master account applied successfully" , success: true})
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error applying master account", success: false, error });
  }
});

app.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId})
    const unseenNotifications = user.unseenNotifications
    const seenNotifications = user.seenNotifications
    seenNotifications.push(...unseenNotifications)
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications
    const updatedUser = await user.save();
    updatedUser.password = undefined
    res.status(200).send({ message: "All notifications marked as seen", success: true, data: updatedUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error applying master account", success: false, error });
  }
});

app.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId})
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({ message: "All notifications deleted", success: true, data: updatedUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error applying master account", success: false, error });
  }
});

app.post("/change-master-status",authMiddleware, async (req, res) => {
  try {
    const {masterId, status, userId} = req.body;
    const master = await Master.findByIdAndUpdate(masterId, {
      status,
    })
    const user = await User.findOne({ _id: userId })
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-master-request-changed",
      message: `Your master account has been ${status}`,
      onclickPath: "/notifications",
    })
    user.isMaster = status === 'approved' ? true : false
    user.save()
    res
      .status(200)
      .send({ message: "Master status updated successfully", success: true, data: master });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error applying master account", success: false, error });
  }
});

app.get("/get-all-approved-masters",authMiddleware, async (req, res) => {
  try {
    const masters = await Master.find({status : 'approved'});
    res.status(201).send({ message: "User", success: true, data: masters });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting users", success: false, error });
  }
});

app.post("/get-master-info-by-id", async (req, res) => {
  try {
    const master = await Master.findOne({ _id: req.body.masterId });
    res
    .status(200)
    .send({ message: "Master info feached successfully", success: true, data: master });    
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error getting master info", success: false, error });
  }
});

app.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const masterInfo = await Master.findOne({ _id: req.body.masterId });
    if (!masterInfo) {
      return res.status(404).send({ message: "Master not found", success: false });
    }
    const newAppointment = new Appointment({
      userId: req.body.userId,
      masterId: req.body.masterId,
      masterInfo, 
      userInfo: req.body.userInfo,
      date: moment(req.body.date, "MM/DD/YYYY").toISOString(),
      time: moment(req.body.time, "hh:mm").toISOString(),
      status: "pending",
    });
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.masterInfo.userId });
    console.log(user)
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `Новый запрос на запись был сделан пользователем ${req.body.userInfo.name}`,
      onclickPath: '/appointments',
    });
    await user.save();

    res.status(200).send({ message: "Appointment booked successfully", success: true, data: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error booking appointment", success: false, error });
  }
});

app.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date , "MM/DD/YYYY").toISOString()
    const fromTime = moment(req.body.time , "hh:mm").subtract(1 , "hours").toISOString()
    const toTime = moment(req.body.time , "hh:mm").add(1 , "hours").toISOString()
    const masterId = req.body.masterId
    const appointments = await Appointment.find({
      masterId,
      date,
      time: {$gte: fromTime, $lte: toTime},
    })
    if(appointments.length > 0){
     return res
    .status(200)
    .send({ message: "Appointment not available", success: false });
    } else{
      return res
    .status(200)
    .send({ message: "Appointment available", success: true });
    }   
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error booking", success: false, error });
  }
});

app.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ id: req.body.userId })
      .populate('masterId');
      console.log(appointments) 
    res.status(201).send({ message: "appointments get successfully", success: true, data: appointments });
  } catch (error) {
    res.status(500).send({ message: "Error getting appointments", success: false, error });
  }
});

app.get("/get-appointments-by-master-id", authMiddleware, async (req, res) => {
  try {
    const master = await Master.findOne({_id: req.body._id})
    console.log(master)
    const appointments = await Appointment.find({ masterId: master._id })
      .populate('masterId'); 
    res.status(201).send({ message: "appointments get successfully", success: true, data: appointments });
  } catch (error) {
    res.status(500).send({ message: "Error getting appointments", success: false, error });
  }
});

app.post("/change-appointment-status",authMiddleware, async (req, res) => {
  try {
    const {appointmentId, status} = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    })
    const user = await User.findOne({ id: appointment.userId })
    console.log(user)
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onclickPath: "/appointments",
    })
    user.save()
    res
      .status(200)
      .send({ message: "Appointment status updated successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating appointment status", success: false, error });
  }
});
