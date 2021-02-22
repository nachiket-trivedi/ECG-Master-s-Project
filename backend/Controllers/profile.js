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

router.get("/personalProfile/:user", requireAuth, async function(req, res) {
  console.log("In Get Personal Profile");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;

  try {
    let query = `SELECT * FROM users WHERE user_id = '${userId}'`;
    con.query(query, function(err, result, fields) {
      if (!result || result.length == 0) {
        // user not in DB
        console.log("Unable to find user");
        pkg = {
          errorType: "User not Found!"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        result = JSON.parse(JSON.stringify(result));
        console.log("result in login db");
        console.log(result);
        let email = result[0].email;
        let firstName = result[0].first_name;
        let lastName = result[0].last_name;
        let addressLine1 = result[0].address_line_1;
        let addressLine2 = result[0].address_line_2;
        let city = result[0].city;
        let state = result[0].state;
        let zipcode = result[0].zipcode;
        let country = result[0].country;
        let contact = result[0].contact;
        let role = result[0].role;
        let medicalProfileFlag = result[0].medicalProfileFlag;
        var message = "Fetched data";

        pkg = {
          message: message,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          zipcode: zipcode,
          country: country,
          contact: contact,
          medicalFlag: medicalProfileFlag
        };

        console.log(pkg);
        res.status(200).send(JSON.stringify(pkg));
        res.end("Successfully Fetched");
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.post("/updatePersonalProfile", requireAuth, async function(req, res) {
  console.log("In Update Personal Profile", req.body);

  let userId = req.body.userId;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let addressLine1 = req.body.addressLine1;
  let addressLine2 = req.body.addressLine2;
  let city = req.body.city;
  let state = req.body.state;
  let zipcode = parseInt(req.body.zipcode, 10);
  let country = req.body.country;
  let contact = req.body.contact;
  var pkg;

  let con = await dbConnection();
  try {
    await con.query("COMMIT");

    bcrypt.hash(password, saltRounds, function(err, hash) {
      let query =
        "UPDATE users SET first_name = ?, last_name= ?, address_line_1= ?, address_line_2= ?,city= ?,state= ?, country= ?,zipcode= ?, password= ?, contact=? where user_id = ?";
      let params = [
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipcode,
        hash,
        contact,
        userId
      ];
      con.query(query, params, function(err, result, fields) {
        if (!result || result.length == 0) {
          // user not in DB
          console.log("Unable to find user");
          pkg = {
            errorType: "User not Found!"
          };
          console.log(pkg);
          res.status(205).send(JSON.stringify(pkg));
          res.end("Unable to fetch data!");
        } else {
          result = JSON.parse(JSON.stringify(result));
          console.log("result in login db");
          console.log(result);
          var response = parseInt(result.changedRows, 10);
          if (response == 1) {
            var message = "Updated data";
            pkg = {
              message: message
            };

            console.log(pkg);
            res.status(200).send(JSON.stringify(pkg));
            res.end("Successfully Updated");
          } else {
            var message = "Unable to update data";
            pkg = {
              message: message
            };

            console.log(pkg);
            res.status(205).send(JSON.stringify(pkg));
            res.end("Could Not Update Fetched");
          }
        }
      });
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.post("/addMedicalProfile", requireAuth, async function(req, res) {
  console.log("In Add Medical Profile", req.body);

  let userId = req.body.userId;
  let gender = req.body.gender;
  let bloodType = req.body.bloodType;

  // Assume data is in format "MM-DD-YYYY"
  var parts = req.body.dob.split("-");
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var DOB = new Date(parts[2], parts[0] - 1, parts[1]);
  console.log(DOB.toDateString());
  DOB = moment(DOB).format("YYYY-MM-DD HH:mm:ss");
  
  let height = req.body.height;
  let weight = req.body.weight;
  let weightUnit = req.body.weightUnit;
  let heightUnit = req.body.heightUnit;

  var heightInM;
  var weightInKg;

  if (weightUnit == "kg") {
    weightInKg = weight;
  } else {
    weightInKg = weight * 0.454;
  }
  if (heightUnit == "cm") {
    heightInM = height * 0.01;
  } else {
    heightInM = height * 0.0254;
  }

  //https://www.spreadsheetconverter.com/examples/health-calculators/body-mass-index-calculator/
  let BMI = weightInKg / (heightInM * heightInM);
  var resMsg = "";
  var pkg;

  let con = await dbConnection();

  try {
    let query = `SELECT * FROM medical_profiles WHERE user_id = '${userId}'`;
    con.query(query, function(err, result, fields) {
      if (err) throw err;

      if (result.length == 0) {
        // user not in DB
        var queryString1 =
          "INSERT INTO medical_profiles (user_id,gender,DOB,height,weight,BMI,blood_type,weight_unit,height_unit) VALUES (?,?,?,?,?,?,?,?,?)";
        con.query(
          queryString1,
          [
            userId,
            gender,
            DOB,
            height,
            weight,
            BMI,
            bloodType,
            weightUnit,
            heightUnit
          ],
          function(error, results) {
            if (error) {
              console.log(error);
              msg = "error";
              res.end(msg);
            } else {
              console.log("Medical records up!");
              resMsg = "Medical Details Added Successfully!";
              let query =
                "UPDATE users SET medicalProfileFlag = ? where user_id = ?";
              con.query(query, [1, userId], function(err, result, fields) {
                if (error) {
                  pkg = {
                    message: resMsg
                  };
                  console.log(pkg);
                  res.status(200).send(JSON.stringify(pkg));
                  res.end("Successfully Added Medical Profile");
                } else {
                  pkg = {
                    message: resMsg,
                    medicalFlag: true
                  };
                  console.log(pkg);
                  res.status(200).send(JSON.stringify(pkg));
                  res.end("Successfully Added Medical Profile");
                }
              });
            }
          }
        );
      } else {
        pkg = {
          message: "User Details Already Exists!"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Could Not Add");
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.get("/medicalProfile/:user", async function(req, res) {
  console.log("In Get Medical Profile");
  let userId = req.params.user;
  let con = await dbConnection();
  var pkg;

  try {
    let query = `SELECT * FROM medical_profiles m WHERE user_id = ${userId}`;
    con.query(query, function(err, result, fields) {
      if (!result || result.length == 0) {
        // user not in DB
        console.log("Unable to find user");
        pkg = {
          errorType: "User not Found!"
        };
        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unable to fetch data!");
      } else {
        result = JSON.parse(JSON.stringify(result));
        console.log("result in login db");
        console.log(result);
        let gender = result[0].gender;
        let dob = result[0].DOB;
        let height = result[0].height;
        let weight = result[0].weight;
        let BMI = result[0].BMI;
        let blood_type = result[0].blood_type;
        let weight_unit = result[0].weight_unit;
        let height_unit = result[0].height_unit;
        var message = "Fetched data";

        pkg = {
          message: message,
          gender: gender,
          dob: dob,
          height: height,
          weight: weight,
          BMI: BMI,
          blood_type: blood_type,
          weight_unit: weight_unit,
          height_unit: height_unit
        };

        console.log(pkg);
        res.status(200).send(JSON.stringify(pkg));
        res.end("Successfully Fetched");
      }
    });
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

router.post("/updateMedicalProfile", requireAuth, async function(req, res) {
  console.log("In Update Medical Profile", req.body);

  let userId = req.body.userId;
  let gender = req.body.gender;
  let bloodType = req.body.bloodType;

  // Assume data is in format "MM-DD-YYYY"
  var parts = req.body.dob.split("-");
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var DOB = new Date(parts[2], parts[0] - 1, parts[1]);
  console.log(DOB.toDateString());
  DOB = moment(DOB).format("YYYY-MM-DD HH:mm:ss");

  let height = req.body.height;
  let weight = req.body.weight;
  let weightUnit = req.body.weightUnit;
  let heightUnit = req.body.heightUnit;

  var heightInM;
  var weightInKg;

  if (weightUnit == "kg") {
    weightInKg = weight;
  } else {
    weightInKg = weight * 0.454;
  }
  if (heightUnit == "m") {
    heightInM = height;
  } else {
    heightInM = height * 0.0254;
  }

  //https://www.spreadsheetconverter.com/examples/health-calculators/body-mass-index-calculator/
  let BMI = weightInKg / (heightInM * heightInM);
  var resMsg = "";
  var pkg;

  let con = await dbConnection();

  try {
    var queryString1 =
      "UPDATE medical_profiles SET gender = ?, DOB= ?, height= ?, weight= ?,BMI= ?,blood_type= ?, weight_unit= ?,height_unit= ? where user_id = ?";
    con.query(
      queryString1,
      [
        gender,
        DOB,
        height,
        weight,
        BMI,
        bloodType,
        weightUnit,
        heightUnit,
        userId
      ],
      function(error, result) {
        if (error) {
          console.log(error);
          msg = "error";
          res.end("Could Not Update");
        } else {
            result = JSON.parse(JSON.stringify(result));
            console.log("result in db",result);
            var response = parseInt(result.changedRows, 10);
            if (response == 1) {
              var message = "Medical Details Updated Successfully!";
              pkg = {
                message: message,
                medicalFlag: true
              };
  
              console.log(pkg);
              res.status(200).send(JSON.stringify(pkg));
              res.end("uccessful Updated Medical Records");
            } else {
              var message = "Unable to update data";
              pkg = {
                message: message
              };
              console.log(pkg);
              res.status(205).send(JSON.stringify(pkg));
              res.end("Could Not Update Fetched");
            }
        }
      }
    );
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
});

module.exports = router;
