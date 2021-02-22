var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
var moment = require("moment");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var config = require("./../Config/settings");

const dbConnection = require('./../Database/sqlDb');

router.post("/patient", async function(req, res) {

  console.log("Inside Register: ",req.body );
  
  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let addressLine1 = req.body.addressLine1;
  let addressLine2 = req.body.addressLine2;
  let city = req.body.city;
  let state = req.body.state;
  let zipcode = parseInt(req.body.zipcode,10);
  let country = req.body.country;
  let contact = req.body.contact;
  let role = "patient";
  let createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  let medicalProfileFlag = "false";
  var resMsg = "";
  var pkg;

  let con = await dbConnection();

  try {
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    con.query(query, function(err,result,fields){
        if (err) throw err;

        if (result.length==0) { // user not in DB
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                var queryString1 = "INSERT INTO users (first_name,last_name,email,address_line_1,address_line_2,city,state,country,zipcode,password,contact,created_at,role,medicalProfileFlag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";    
                con.query(queryString1,[firstName,lastName,email,addressLine1,addressLine2,city,state,country,zipcode,hash,contact,createdAt,role,medicalProfileFlag],function(error, results) {
                    if (error) 
                        {
                            console.log(error);
                            msg="error";
                            res.end(msg);
                        } else {       
                            console.log("User Signs up!");
                            resMsg = "User Added Successfully!";
                            var token = {
                              email: email,
                              user: role
                            };
                            var signed_token = jwt.sign(token, config.secret, {
                              expiresIn: 86400 // in seconds
                            });
                            pkg = {
                              message: resMsg,
                              firstName: firstName,
                              lastName: lastName,
                              email: email,
                              role: role,
                              medicalFlag: false,
                              token: signed_token
                            };
                            console.log(pkg);
                            res.status(200).send(JSON.stringify(pkg));
                            res.end("Successful Registration");
                            }       
                     });       
            });
                
        } else {
            pkg = {
                message: "User Already Exists!"
            };
              console.log(pkg);
              res.status(205).send(JSON.stringify(pkg));
              res.end("Unsuccessful Registration");
        } 
    })
} catch (ex) {
    console.log(ex);
    throw ex;
}
});

module.exports = router;


    