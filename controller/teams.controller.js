const TEAMS_MODEL = require("../models/teams");

const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { ObjectId } = require("bson");
const { default: axios } = require("axios");

const createTeam = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { team_name, teamLeaderIds, employeeIds } = req.body;

    if (!team_name || team_name == "") {
      res.json({ status: "0", message: "Team name is required" });
      return;
    }

    let teamData = await TEAMS_MODEL.findOne(
      {
        team_name,
      },
    );
    if (teamData) {
      res.json({
        status: "0",
        message: "Team Name is already used",
      });
    } else {
      teamData = new TEAMS_MODEL({
        team_name,
        project_manager_id: userId,
        team_leader_ids: teamLeaderIds,
        employee_ids: employeeIds
      });
      try {
        let response = await teamData.save();
        console.log(response);

        res.json({
          status: "1",
          message: "Team Created Successfully",
          details: {
            team: teamData
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


const getAllTeams = async (req, res) => {
  let data = await TEAMS_MODEL.find()
    .populate({ path: "project_manager_id" })
    .populate({ path: "team_leader_ids.user_id" })
    .populate({ path: "employee_ids.user_id" })

  res.json({
    status: "1",
    details: {
      teams: data
    }
  })
}


const getMyTeams = async (req, res) => {
  const { userId } = req.userData
  let data = await TEAMS_MODEL.find({
    $or: [
      { team_leader_ids: { $elemMatch: { user_id: ObjectId(userId) } } },
      { employee_ids: { $elemMatch: { user_id: ObjectId(userId) } } }
    ]
  })
    .populate({ path: "project_manager_id" })
    .populate({ path: "team_leader_ids.user_id" })
    .populate({ path: "employee_ids.user_id" })

  res.json({
    status: "1",
    details: {
      teams: data,
      userId,
    }
  })
}




module.exports = {
  createTeam,
  getAllTeams,
  getMyTeams
};

