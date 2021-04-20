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

module.exports = router;
