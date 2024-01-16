const mongoose = require("mongoose");
const accessRolesSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      isMaster: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
  const AccessRoles = mongoose.model("AccessRoles", accessRolesSchema);
  module.exports = AccessRoles;