const USER_ROLES_MODEL = require("../models/user_roles");

const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { ObjectId } = require("bson");
const { default: axios } = require("axios");

// const appendNotification = async (
//   model,
//   users,
//   msg,
//   url,
//   body = "",
//   userId = null
// ) => {
//   // send msg
//   await model.updateMany(
//     model == AdminModel
//       ? {
//         role: {
//           $in: users,
//         },
//       }
//       : {},
//     {
//       $push: {
//         notifications: {
//           message: msg,
//           redirectUrl: url,
//           body,
//           created: Date.now(),
//         },
//       },
//       $inc: {
//         unseenNotifications: 1,
//       },
//     }
//   );

//   // get admin token

//   if (userId) {
//     var user = await model.findOne({ _id: userId });
//   } else {
//     var user = await model.findOne();
//   }

//   try {
//     let ENDPOINT = "https://learn-global-backend.onrender.com/notification";
//     // let ENDPOINT = "http://localhost:3006/notification";

//     console.log({ user });

//     let token = [user.web_push_token];

//     if (model == StudentModel) {
//       token = [user.web_push_token, user.device_token];
//     }

//     console.log({ token });

//     const response = await axios.post(ENDPOINT, {
//       title: msg,
//       body: body,
//       token: token,
//       redirectUrl: url,
//     });

//     console.log({ response });
//   } catch (error) {
//     console.log({ error1: error });
//   }
// };

// const testNotification = async (req, res) => {
//   let userId = req.body.userId;
//   let msg = "Test Notification";
//   let url = "https://learn-global.onrender.com/d/student";
//   await appendNotification(StudentModel, [], msg, url, "", userId);
//   res.json({ success: "1", message: "Test Notification Send" });
// };

const createRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || role == "") {
      res.json({ status: "0", message: " Role Title is required" });
      return;
    }

    let roleData = await USER_ROLES_MODEL.findOne(
      {
        role,
      },
    );
    if (roleData) {
      res.json({
        status: "0",
        message: "Role Title is already used",
      });
    } else {
      roleData = new USER_ROLES_MODEL({
        role,
      });

      try {
        let response = await roleData.save();
        console.log(response);

        res.json({
          status: "1",
          message: "Role Created Successfully",
          details: {
            role: roleData
          },
        });
        return;

      } catch (error) {
        if (error.name === "ValidationError") {
          let errorsData = {};
          Object.keys(error.errors).forEach((key) => {
            errorsData[key] = error.errors[key].message;
          });

          res.json({
            status: "0",
            name: "ValidationError",
            message: "Validation Error",
            details: {
              error: errorsData,
            },
          });
          return;
        }

      }
    }
  }
  catch (error) {
    console.log(error);
    res.json({
      status: "0",
      message: "Server Error Occured",
      details: {
        error,
      },
    });
  }
}

const getAll = async (req, res) => {
  try {
    let response = await USER_ROLES_MODEL.find().sort({ "createdAt": "-1" });
    res.json({
      status: "1",
      message: "Roles Find Successfully",
      details: {
        roles: response
      }
    });
  } catch (error) {
    console.log({ error })
    res.json({
      status: "0",
      message: "Server Error Occured",
      details: {
        error,
      },
    });
  }
}

const getOne = async (req, res) => {
  let { id } = req.params;
  try {
    let response = await USER_ROLES_MODEL.findOne({ _id: id });
    res.json({
      status: "1",
      message: "Single Role Find Successfully",
      details: {
        role: response
      }
    });
  } catch (error) {
    res.json({
      status: "0",
      message: "Server Error Occured",
      details: {
        error,
      },
    });
  }
}

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await USER_ROLES_MODEL.findByIdAndDelete(id);
    res.json({
      status: "1",
      message: "Delete Successfully",
      details: {
        role: response,
      }
    });
  } catch (error) {
    res.json({
      status: "0",
      message: "Server Error Occured",
      details: {
        error,
      },
    });
  }
}

const getPermissions = async (req, res) => {
  let { role } = req.body;
  let data = await USER_ROLES_MODEL.findOne({ role })
  if (!data) {
    res.json({
      status: "0",
      message: "Role not found"
    })
    return
  }

  let permissions = data.permissions;

  res.json({
    status: "1",
    message: "Permissions found",
    details: {
      permissions
    }
  })
}

const updatePermissions = async (req, res) => {
  let { roleId, newPermissions } = req.body;
  let data = await USER_ROLES_MODEL
    .findOneAndUpdate({
      _id: roleId
    }, {
      $set: { permissions: newPermissions }
    })

  res.json({
    status: "1",
    message: "Permissions Update",
  })
}


module.exports = {
  createRole, getAll, getOne, deleteOne, getPermissions, updatePermissions
};

