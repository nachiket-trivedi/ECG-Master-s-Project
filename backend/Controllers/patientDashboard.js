var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("./../Config/settings");
const dbConnection = require("./../Database/sqlDb");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

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

router.get("/ecgAgewise/:user", async function(req, res) {
  console.log("In Get Number of ECG Agewise");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;
  let normal = 0;
  let abnormal = 0;

  try {
    let query = `SELECT DOB FROM medical_profiles WHERE user_id = ${userId}`;
    con.query(query, function(err, result_dob, fields) {
      if (err) {
        console.log("Unable to fetch data");
        pkg = {
          errorType: "Error in fetching abnormal"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        var dateArray = result_dob[0].DOB.toISOString().split("-");
        console.log(dateArray[0]);
        var age = new Date().getFullYear() - dateArray[0];

        var month = new Date();
        if (month.getMonth() < dateArray[1] - 1) {
          age -= 1;
        }

        let query2 = "";

        console.log(age);
        if (age > 0 && age < 19) {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 19 YEAR AND CURDATE() - INTERVAL 1 YEAR `;
        } else if (age >= 19 && age <= 30) {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 30 YEAR AND CURDATE() - INTERVAL 19 YEAR `;
        } else if (age > 30 && age <= 40) {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 40 YEAR AND CURDATE() - INTERVAL 30 YEAR `;
        } else if (age > 40 && age <= 50) {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 50 YEAR AND CURDATE() - INTERVAL 40 YEAR`;
        } else if (age > 50 && age <= 60) {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 60 YEAR AND CURDATE() - INTERVAL 50 YEAR `;
        } else {
          query2 = `SELECT user_id FROM ecgdb.medical_profiles WHERE DOB BETWEEN CURDATE() - INTERVAL 130 YEAR AND CURDATE() - INTERVAL 60 YEAR`;
        }

        con.query(query2, function(err, result, fields) {
          if (err) {
            console.log("Unable to fetch data");
            pkg = {
              errorType: "Error in fetching abnormal"
            };
            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Unable to fetch data!");
          } else {
            var arrayOfUsers = "(";

            for (var i = 0; i < result.length; i++) {
              var userId = result[i].user_id;
              console.log(userId);
              if (i != 0) {
                arrayOfUsers = arrayOfUsers.concat(",");
              }
              arrayOfUsers = arrayOfUsers.concat(userId);
            }

            arrayOfUsers = arrayOfUsers.concat(")");
            console.log("Hey Look Here:", arrayOfUsers);
            let query3 = `SELECT count(*) as count FROM abnormal_ecg WHERE user_id IN ${arrayOfUsers}`;
            let query4 = `SELECT count(*) as count FROM normal_ecg WHERE user_id IN ${arrayOfUsers}`;

            con.query(query3, function(err, result_abnormal_count, fields) {
              if (err) {
                abnormal = 0;
              } else {
                console.log(" AbNormal: ", result_abnormal_count[0].count);
                abnormal += result_abnormal_count[0].count;
                con.query(query4, function(err, result_normal_count, fields) {
                  if (err) {
                    normal = 0;
                  } else {
                    console.log(" Normal: ", result_normal_count[0].count);
                    normal += result_normal_count[0].count;
                  }
                  pkg = {
                    abnormal: Math.ceil(abnormal / 3),
                    normal: Math.ceil(normal / 3)
                  };
                  res.status(200).send(JSON.stringify(pkg));
                  res.end("Successfully Fetched");
                });
              }
            });
          }
        });
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.get("/ecgCountrywise/:user", async function(req, res) {
  console.log("In Get Number of ECG Countrywise");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;
  let normal = 0;
  let abnormal = 0;

  try {
    let query = `SELECT country FROM users WHERE user_id = ${userId}`;
    con.query(query, function(err, result_country, fields) {
      if (err) {
        console.log("Unable to fetch data");
        pkg = {
          errorType: "Error in fetching abnormal"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        console.log(result_country[0].country);
        let country = result_country[0].country;
        let query2 = `SELECT user_id FROM ecgdb.users WHERE country ='${country}'`;

        con.query(query2, function(err, result, fields) {
          if (err) {
            console.log("Unable to fetch data");
            pkg = {
              errorType: "Error in fetching abnormal"
            };
            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Unable to fetch data!");
          } else {
            var arrayOfUsers = "(";

            for (var i = 0; i < result.length; i++) {
              var userId = result[i].user_id;
              console.log(userId);
              if (i != 0) {
                arrayOfUsers = arrayOfUsers.concat(",");
              }
              arrayOfUsers = arrayOfUsers.concat(userId);
            }
            arrayOfUsers = arrayOfUsers.concat(")");

            console.log("Hey Look Here:", arrayOfUsers);

            let query3 = `SELECT count(*) as count FROM abnormal_ecg WHERE user_id IN ${arrayOfUsers}`;
            let query4 = `SELECT count(*) as count FROM normal_ecg WHERE user_id IN ${arrayOfUsers}`;

            con.query(query3, function(err, result_abnormal_count, fields) {
              if (err) {
                abnormal = 0;
              } else {
                console.log(" AbNormal: ", result_abnormal_count[0].count);
                abnormal += result_abnormal_count[0].count;
                con.query(query4, function(err, result_normal_count, fields) {
                  if (err) {
                    normal = 0;
                  } else {
                    console.log(" Normal: ", result_normal_count[0].count);
                    normal += result_normal_count[0].count;
                  }
                  pkg = {
                    abnormal: Math.ceil(abnormal / 3),
                    normal: Math.ceil(normal / 3)
                  };
                  res.status(200).send(JSON.stringify(pkg));
                  res.end("Successfully Fetched");
                });
              }
            });
          }
        });
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.get("/ecgProfile/:user", async function(req, res) {
  console.log("In Profile ECG data");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;
  let count = 0;
  let date = "";

  try {
    let query = `SELECT class, timestamp FROM abnormal_ecg WHERE user_id = ${userId} ORDER BY timestamp ASC;`;
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
        let query2 = `SELECT timestamp FROM normal_ecg WHERE user_id = ${userId} ORDER BY timestamp ASC;`;
        con.query(query2, function(err, result_normal, fields) {
          console.log(result_abnormal);

          count = result_abnormal.length / 3;
          date = result_abnormal[
            result_abnormal.length - 1
          ].timestamp.toISOString();
          if (err) {
            console.log(err);
            pkg = {
              count: Math.ceil(count),
              date: date,
              errorType: "Error in fetching normal"
            };
            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Fetched Data with some error!");
          } else {
            console.log(result_normal);
            count = (result_normal.length + result_abnormal.length) / 3;

            if (result_normal.length > 1) {
              date =
                result_abnormal[
                  result_abnormal.length - 1
                ].timestamp.toISOString() >
                result_normal[result_normal.length - 1].timestamp.toISOString()
                  ? result_abnormal[
                      result_abnormal.length - 1
                    ].timestamp.toISOString()
                  : result_normal[
                      result_normal.length - 1
                    ].timestamp.toISOString();
            }

            pkg = {
              count: Math.ceil(count),
              date: date,
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
