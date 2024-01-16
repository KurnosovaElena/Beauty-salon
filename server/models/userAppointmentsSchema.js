
const mongoose = require("mongoose");
const userAppointmentsSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
      }],
    },
    {
      timestamps: true,
    }
  );
  const UserAppointments = mongoose.model("UserAppointments", userAppointmentsSchema);
  module.exports = UserAppointments;
  