const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        trim: true,
        lowercase: true,
        required: [
            true, 'Email is required'
        ],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        // required: [true, 'Password is required'],
        // minlength: [6, "Password must have minimum 6 characters"],
    },
    parent_id: {
        type: ObjectId,
        ref: "users"
    },
    firstname: {
        type: String,
        trim: true,
        // required: [true, 'First Name is required'],
    },
    lastname: {
        type: String,
        trim: true,
        // required: [true, 'Last Name is required'],
    },
    phone: {
        type: String,
        // required: [true, 'Phone number is required'],
        // minlength: [10, "Phone number is invalid"],
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    user_role_id: {
        type: ObjectId,
        ref: "user_roles"
    },
    notifications: [
        {
            message: String,
            redirectUrl: String,
            body: String,
            created: String
        }
    ],
    unseenNotifications: {
        type: Number,
        default: 0
    },
    web_push_token: {
        type: String,
        default: ""
    },
    teams: {
        type: [{
            id: {
                type: ObjectId,
                ref: "teams"
            },
        }],
        timestamps: true,
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "BLOCKED"]
    },
    total_leaves: {
        type: {
            emergency: {
                type: Number,
                default: 0
            },
            medical: {
                type: Number,
                default: 0
            },
            casual: {
                type: Number,
                default: 0
            },
        }
    }
}, { timestamps: true });

// Compile model from schema
module.exports = USERS_MODEL = model("users", userSchema);
