const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const taskschema = new Schema({
    task_name: {
        type: String,
        trim: true,
    },
    task_description: {
        type: String,
    },
    parent_id: { // who create and assign the task to the team
        type: ObjectId,
        ref: "users"
    },
    team_id: {
        type: ObjectId,
        ref: "teams"
    },
    team_leader_ids: { // team leader who is responsible for this task.. these can be more than 1 so use array
        type: [{
            user_id: {
                type: ObjectId,
                ref: "users"
            },
        }],
        timestamps: true,
    },
    employee_ids: { // For multiple employees who works on the task
        type: [{
            user_id: {
                type: ObjectId,
                ref: "users"
            },
        }],
        timestamps: true,
    },
    status: {
        type: String,
        default: "PENDING",
        enum: [
            "PENDING", // Only created not assigned
            "ASSIGNED", // Assign to one team and set responsible team-leader(s)
            "IN_PROCESS", // When user is worked on the task
            "SUBMITTED", // When the task is completed and submitted to the team-leader then it gone to testing mode
            "LATE_SUBMITTED", // If submit the task after dead-line
            "TESTING", // Testing phase
            "DONE", // IF testing paas
            "FAILED", // If testing failed then re-assign to same or another team-leader
        ]
    }
}, { timestamps: true });

// Compile model from schema
module.exports = TASKS_MODEL = model("tasks", taskschema);
