const mongoose = require("mongoose");
const masterNotificationsSchema = new mongoose.Schema(
    {
      masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'masters',
        required: true,
      },
      seenNotifications: {
        type: Array,
        default: [],
      },
      unseenNotifications: {
        type: Array,
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );
  const MasterNotifications = mongoose.model("MasterNotifications", masterNotificationsSchema);
  module.exports = MasterNotifications;
  