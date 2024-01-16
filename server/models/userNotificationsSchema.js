const mongoose = require("mongoose");
const userNotificationsSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
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
  const UserNotifications = mongoose.model("UserNotifications", userNotificationsSchema);
  module.exports = UserNotifications;
  