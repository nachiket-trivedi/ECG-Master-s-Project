'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./settings');

// Setup work and export for the JWT passport strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("JWT Payload:", jwt_payload);
    let email = jwt_payload.email;
    let con = await dbConnection();
    try {
      let result = await con.query('SELECT * FROM users WHERE email = ?', email);
      if (result && result.length>0) { // user not in DB
            console.log("Authentication valid");
            return done(null, result);
        } else {
            return done(null, false);
        }
    }
 catch (ex) {
    console.log(ex);
    throw ex;
} finally {
    await con.release();
    await con.destroy();
}
}));

module.exports = passport;




