var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("./../Config/settings");
const dbConnection = require("./../Database/sqlDb");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var moment = require("moment");

require("../Config/passport")(passport);

router.post("/updateECGanalysis", async function(req, res) {
  console.log("In updateECGanalysis. ");
  let signal1 = JSON.stringify(req.body.val1);
  let signal2 = JSON.stringify(req.body.val2);
  let signal3 = JSON.stringify(req.body.val3);
  let classification = req.body.class;
  let userID = req.body.id;
  let class1 = classification[0];
  let class2 = classification[1];
  let class3 = classification[2];
  let createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  let con = await dbConnection();
  try {
    if (class1 === "Normal ECG") {
      var queryString1 =
        "INSERT INTO normal_ecg (user_id,timestamp,ecg_signal_data) VALUES (?,?,?)";
      con.query(queryString1, [userID, createdAt, signal1], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 1 as normal");
        }
      });
    } else {
      var queryString1 =
        "INSERT INTO abnormal_ecg (user_id,timestamp,class,ecg_signal_data) VALUES (?,?,?,?)";
      con.query(queryString1, [userID, createdAt, class1, signal1], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 1 as abnormal");
        }
      });
    }

    if (class2 === "Normal ECG") {
      var queryString1 =
        "INSERT INTO normal_ecg (user_id,timestamp,ecg_signal_data) VALUES (?,?,?)";
      con.query(queryString1, [userID, createdAt, signal2], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 2 as normal");
        }
      });
    } else {
      var queryString1 =
        "INSERT INTO abnormal_ecg (user_id,timestamp,class,ecg_signal_data) VALUES (?,?,?,?)";
      con.query(queryString1, [userID, createdAt, class2, signal2], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 2 as abnormal");
        }
      });
    }

    if (class3 === "Normal ECG") {
      var queryString1 =
        "INSERT INTO normal_ecg (user_id,timestamp,ecg_signal_data) VALUES (?,?,?)";
      con.query(queryString1, [userID, createdAt, signal3], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 3 as normal");
        }
      });
    } else {
      var queryString1 =
        "INSERT INTO abnormal_ecg (user_id,timestamp,class,ecg_signal_data) VALUES (?,?,?,?)";
      con.query(queryString1, [userID, createdAt, class3, signal3], function(
        error,
        results
      ) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end(msg);
        } else {
          console.log("inserted class 3 as abnormal");
        }
      });
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});
module.exports = router;
