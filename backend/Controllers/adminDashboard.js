var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("./../Config/settings");
const dbConnection = require("./../Database/sqlDb");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var moment = require("moment");

require("../Config/passport")(passport);

router.get("/userCount", async function(req, res) {
  console.log("In Get Number of Users");

  let con = await dbConnection();
  var pkg;
  let monthly_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  try {
    let query = `SELECT user_id, created_at FROM users`;
    con.query(query, function(err, result, fields) {
      if (err) {
        console.log("Unable to fetch data");
        pkg = {
          errorType: "Error in fetching data"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        for (var i = 0; i < result.length; i++) {
          var temp = result[i].created_at.toISOString().split("-");
          console.log(temp[1]);
          monthly_count[temp[1] - 1]++;
        }
        pkg = {
          userCount: monthly_count
        };
        res.status(200).send(JSON.stringify(pkg));
        res.end("Successfully Fetched");
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.get("/ecgRecords", async function(req, res) {
  console.log("In Get Number of ECG Records");

  let con = await dbConnection();
  var pkg;
  let normal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let abnormal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  try {
    let query = `SELECT class, timestamp FROM abnormal_ecg`;
    con.query(query, function(err, result_abnormal, fields) {
      if (err) {
        console.log("Unable to fetch data");
        pkg = {
          errorType: "Error in fetching abnormal"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        let query2 = `SELECT timestamp FROM normal_ecg`;
        con.query(query2, function(err, result_normal, fields) {
          for (var i = 0; i < result_abnormal.length; i++) {
            var temp = result_abnormal[i].timestamp.toISOString().split("-");
            console.log(temp[1]);
            abnormal[temp[1] - 1]++;
          }
          abnormal = abnormal.map(item => {
            return Math.ceil(item / 3);
          });
          if (err) {
            console.log(err);
            pkg = {
              abnormal: abnormal,
              normal: normal,
              errorType: "Error in fetching normal"
            };
            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Fetched Data with some error!");
          } else {
            console.log(result_normal);
            for (var i = 0; i < result_normal.length; i++) {
              var temp = result_normal[i].timestamp.toISOString().split("-");
              normal[temp[1] - 1]++;
            }
            normal = normal.map(item => {
              return item / 3;
            });
            pkg = {
              abnormal: abnormal,
              normal: normal,
              errorType: "Error in fetching normal"
            };
            res.status(200).send(JSON.stringify(pkg));
            res.end("Successfully Fetched");
          }
        });
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.get("/ecgAgewise", async function(req, res) {
  console.log("In Get Agewise Abnormal ECG- Admin");

  let con = await dbConnection();
  var pkg;
  var below18 = 0;
  var below30 = 0;
  var below40 = 0;
  var below50 = 0;
  var below60 = 0;
  var above60 = 0;

  try {
    let query = `SELECT count(*) as count, user_id FROM ecgdb.abnormal_ecg WHERE user_id IN (12,17) GROUP BY user_id`;
    con.query(query, function(err, result_count, fields) {
      if (err) {
        console.log("Unable to fetch data");
        pkg = {
          errorType: "Error in fetching data"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        console.log(result_count);
        let query2 = `SELECT user_id, DOB FROM ecgdb.medical_profiles`;
        con.query(query2, function(err, result_users, fields) {
          if (err) {
            console.log("Unable to fetch data");
            pkg = {
              errorType: "Error in fetching data"
            };
            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Unable to fetch data!");
          } else {
            console.log(result_users);
            let countMap = new Map();

            for (var i = 0; i < result_count.length; i++) {
              countMap.set(result_count[i].user_id, result_count[i].count);
            }

            for (var i = 0; i < result_users.length; i++) {
              var dateArray = result_users[i].DOB.toISOString().split("-");
              console.log(dateArray[0]);
              var age = new Date().getFullYear() - dateArray[0];
              var month = new Date();
              if (month.getMonth() < dateArray[1] - 1) {
                age -= 1;
              }

              if (age > 0 && age < 19) {
                below18 += countMap.get(result_users[i].user_id);
              } else if (age >= 19 && age <= 30) {
                below30 += countMap.get(result_users[i].user_id);
              } else if (age > 30 && age <= 40) {
                below40 += countMap.get(result_users[i].user_id);
              } else if (age > 40 && age <= 50) {
                below50 += countMap.get(result_users[i].user_id);
              } else if (age > 50 && age <= 60) {
                below60 += countMap.get(result_users[i].user_id);
              } else {
                above60 += countMap.get(result_users[i].user_id);
              }
            }
            pkg = {
              below18: Math.ceil(below18 / 3),
              below30: Math.ceil(below30 / 3),
              below40: Math.ceil(below40 / 3),
              below50: Math.ceil(below50 / 3),
              below60: Math.ceil(below60 / 3),
              above60: Math.ceil(above60 / 3)
            };
            res.status(200).send(JSON.stringify(pkg));
            res.end("Successfully Fetched");
          }
        });
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

module.exports = router;
