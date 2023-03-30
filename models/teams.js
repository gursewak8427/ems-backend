const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
    team_name: {
        type: String,
        trim: true,
        // required: [true, 'First Name is required'],
    },
    project_manager_id: {
        type: ObjectId,
        ref: "users"
        // required: [true, 'Last Name is required'],
    },
    team_leader_ids: {
        type: [{
            user_id: {
                type: ObjectId,
                ref: "users"
            },
            created: {
                type: Date,
                default: Date.now()
            },
        }],
    },
    employee_ids: {
        type: [{
            user_id: {
                type: ObjectId,
                ref: "users"
            },
            created: {
                type: Date,
                default: Date.now()
            },
        }],
    },
}, { timestamps: true });

// Compile model from schema
module.exports = TEAMS_MODEL = model("teams", teamSchema);
