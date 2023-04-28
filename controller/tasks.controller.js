const TASKS_MODEL = require("../models/tasks");
const TEAMS_MODEL = require("../models/teams");
const UPLOADED_DATA = require("../models/uploadedData");

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
  const { parentId } = req.body;
  if (parentId) {
    var data = await TASKS_MODEL.find({ parent_id: parentId })
      .populate({ path: "parent_id" })
      .populate({ path: "team_id" })
      .populate({ path: "team_leader_ids.user_id" })
      .populate({ path: "employee_ids.user_id" })
  } else {
    var data = await TASKS_MODEL.find()
      .populate({ path: "parent_id" })
      .populate({ path: "team_id" })
      .populate({ path: "team_leader_ids.user_id" })
      .populate({ path: "employee_ids.user_id" })
  }

  res.json({
    status: "1",
    details: {
      tasks: data
    }
  })
}

const getTeamTasks = async (req, res) => {
  console.log("HEREEEE")
  let { teamId } = req.params
  const { userId } = req.userData


  let data = await TASKS_MODEL.find({ team_id: teamId })
    .populate({ path: "parent_id" })
    .populate({ path: "team_leader_ids.user_id" })
    .populate({ path: "employee_ids.user_id" })

  let teamDetail = await TEAMS_MODEL.findOne({ _id: teamId })
    .populate({ path: "project_manager_id" })
    .populate({ path: "team_leader_ids.user_id" })
    .populate({ path: "employee_ids.user_id" })

  res.json({
    status: "1",
    details: {
      tasks: data,
      userId,
      teamDetail
    }
  })
}

const updateTask = async (req, res) => {
  try {
    let { task } = req.body;
    console.log(task)
    let taskId = task._id;
    delete task._id
    await TASKS_MODEL.updateOne({ _id: taskId }, { ...task })
    res.json({
      status: "1",
      message: "Task Updated Successfully"
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: "0",
      message: "Task Updated Failed"
    })
  }
}

const uploadData = async (req, res) => {
  try {
    const { userId } = req.userData;
    var { taskId, submit_type, submit_data } = req.body;
    if (submit_type == "FILES") {
      submit_data = req.files.files.map(file => file.filename)
      // let file = req.files.file;
      // let fileName = file.name;
      // let fileExtension = fileName.split(".")[1];
      // let fileData = fs.readFileSync(file.path);
      // let fileHash = bcrypt.hashSync(fileData, saltRounds);
    } else {
      submit_data = submit_data.split(";")
    }

    let uploadedData = new UPLOADED_DATA({
      task_id: taskId,
      submit_type: submit_type,
      submit_data: submit_data,
      parent_id: ObjectId(userId)
    })

    uploadedData.save();
    res.json({
      status: "1",
      message: "Data Uploaded Successfully"
    })
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

const getData = async (req, res) => {
  try {
    // const { userId } = req.userData;
    var { taskId } = req.body;

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.PORT || 3006;
    if (host === "localhost") {
      var fullUrl = `${protocol}://${host}:${port}`;
    } else {
      var fullUrl = `${protocol}://${host}`;
    }


    let data = await UPLOADED_DATA.find({
      task_id: taskId,
    }).sort({ "createdAt": "-1" })
      .populate({ path: "parent_id" })

    console.log({ data, taskId })

    res.json({
      status: "1",
      message: "Data Get Successfully",
      details: {
        data: data,
        baseUrl: fullUrl + "/uploads/"
      }
    })
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

module.exports = {
  createTask,
  getAllTasks,
  getTeamTasks,
  updateTask,
  uploadData,
  getData
};

