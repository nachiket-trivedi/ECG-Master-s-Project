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

router.get("/ecgRecords/:user", async function(req, res) {
  console.log("In Get Number of ECG Records");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;
  let normal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let abnormal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  try {
    let query = `SELECT class, timestamp FROM abnormal_ecg WHERE user_id = ${userId}`;
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
        let query2 = `SELECT timestamp FROM normal_ecg WHERE user_id = ${userId}`;
        con.query(query2, function(err, result_normal, fields) {

          for (var i = 0; i < result_abnormal.length; i++) {
            var temp = result_abnormal[i].timestamp.toISOString().split("-");
            console.log(temp[1])
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

module.exports = router;
