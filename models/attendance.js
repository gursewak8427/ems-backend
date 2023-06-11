const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const uploadedData = new Schema({
    day: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    hour: {
        type: String,
    },
    minute: {
        type: String,
    },
    user_id: {
        type: ObjectId,
        ref: "users"
    },
    attendance: {
        type: String,
        enum: [
            "PRESENT",
            "ABSENT",
            "PENDING",
            "LEAVE",
            "PAID_LEAVE"
        ],
        default: "PENDING"
    },
}, { timestamps: true });

// Compile model from schema
module.exports = ATTENDACE = model("attendace", uploadedData);
