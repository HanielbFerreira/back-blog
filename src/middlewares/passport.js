const jwt = require("passport-jwt");
const Strategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const config = require("../../config/config");
const User = require("../models/user.model");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret_key
};

/**
 * @author Haniel Barros
 * this method is used to put on the payload, id/isAdmin/username
 */

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              isAdmin: user.isAdmin,
              username: user.username
            });
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
