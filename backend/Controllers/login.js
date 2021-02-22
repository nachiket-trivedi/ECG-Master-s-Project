var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var config = require("./../Config/settings");
const dbConnection = require('./../Database/sqlDb');

router.post("/", async function(req, res) {
  console.log("Inside Login: ",req.body );
  
  let email = req.body.email;
  let pass = req.body.password;
  var resMsg = "";
  var firstName;
  var lastName;
  var pkg;

 
  let con = await dbConnection();

  try {
    //let result = await con.query('SELECT * FROM users WHERE email = ?', email);
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    con.query(query, function(err,result,fields){
    if (!result || result.length==0) { // user not in DB
        console.log("Unable to find user");
        pkg = {
            errorType: "User not Found!",
            message:"Invalid Credentials"
        };
          console.log(pkg);
          res.status(205).send(JSON.stringify(pkg));
          res.end("Unsuccessful Login");
    } else {
        result = JSON.parse(JSON.stringify(result));
        console.log("result in login db")
        console.log(result)

        let passwordInDb = result[0].password;
        let role = result[0].role;
        let medicalFlag = result[0].medicalProfileFlag;
        let userId = result[0].user_id;
        firstName = result[0].first_name;
        lastName = result[0].last_name;


        bcrypt.compare(pass, passwordInDb, function(err, resp) {
            if (resp) {
              console.log("User logs in!");
              resMsg = "Login Successful";

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
                medicalFlag: medicalFlag,
                userId: userId,
                token: signed_token
              };

              console.log(pkg);
              res.status(200).send(JSON.stringify(pkg));
              res.end("Successful Login");

    } else {
        resMsg = "Unsuccessful Login";
        pkg = {
            errorType: "Invalid Credentials",
            message: resMsg
        };

        console.log(pkg);
        res.status(205).send(JSON.stringify(pkg));
        res.end("Unsuccessful Login");
    }
})
}
})
} catch (ex) {
    console.log(ex);
    throw ex;
} 
});

module.exports = router;