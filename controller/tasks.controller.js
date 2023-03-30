const TASKS_MODEL = require("../models/tasks");

const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { ObjectId } = require("bson");
const { default: axios } = require("axios");

const createTask = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { task_name, task_description, team_id, team_leader_ids } = req.body;

    if (!task_name || task_name == "") {
      res.json({ status: "0", message: "Task name is required" });
      return;
    }

    let taskData = await TASKS_MODEL.findOne(
      {
        task_name,
      },
    );
    if (taskData) {
      res.json({
        status: "0",
        message: "Task name is already used",
      });
    } else {
      taskData = new TASKS_MODEL({
        task_name,
        task_description,
        parent_id: userId,
        team_id,
        team_leader_ids,
      });
      try {
        let response = await taskData.save();
        console.log(response);

        res.json({
          status: "1",
          message: "Team Created Successfully",
          details: {
            task: taskData
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


const getAllTasks = async (req, res) => {
  let data = await TASKS_MODEL.find()
    .populate({ path: "parent_id" })
    .populate({ path: "team_id" })
    .populate({ path: "team_leader_ids.user_id" })
    .populate({ path: "employee_ids.user_id" })

  res.json({
    status: "1",
    details: {
      tasks: data
    }
  })
}

module.exports = {
  createTask,
  getAllTasks
};

