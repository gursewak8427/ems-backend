const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const uploadedData = new Schema({
    task_id: {
        type: ObjectId,
        ref: "tasks",
    },
    submit_type: {
        type: String,
        required: true
    },
    parent_id: {
        type: ObjectId,
        ref: "users"
    },
    submit_data: [String],
}, { timestamps: true });

// Compile model from schema
module.exports = UPLOADED_DATA = model("uploaded_data", uploadedData);
