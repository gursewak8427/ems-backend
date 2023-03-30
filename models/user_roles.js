const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const userRolesSchema = new Schema({
    role: {
        type: String,
    },
    permissions: {
        type: [String],
        default: [""]
    }
}, { timestamps: true });

// Compile model from schema
module.exports = USER_ROLES_MODEL = model("user_roles", userRolesSchema);
