const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("./database");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
	opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      User.getUserById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          console.log(`JWT: user (${jwt_payload.name}) iat: (${jwt_payload.iat}) exp: ${jwt_payload.exp}`)
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
