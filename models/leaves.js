const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const uploadedData = new Schema({
    leave_description: {
        type: String,
        required: true
    },
    leave_type: {
        type: String,
        required: true
    },
    leave_date: {
        type: {
            day: String,
            month: String,
            year: String,
        }
    },
    response_date: String,
    userId: {
        type: ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        enum: ["PENDING", "REJECTED", "APPROVED", "PAID_LEAVE"],
        default: "PENDING"
    }
}, { timestamps: true });

// Compile model from schema
module.exports = LEAVES = model("leaves", uploadedData);
