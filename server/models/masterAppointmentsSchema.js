const mongoose = require("mongoose");
const masterAppointmentsSchema = new mongoose.Schema(
    {
      masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'masters',
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
  const MasterAppointments = mongoose.model("MasterAppointments", masterAppointmentsSchema);
  module.exports = MasterAppointments;
  