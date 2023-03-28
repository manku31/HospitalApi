const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const Doctor = require("../models/doctor");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
}

passport.use(new JwtStrategy(opts, function(jwtPayload, done){
    Doctor.findById(jwtPayload.id, function(err, doctor){
        if(err){
            return done(err, false);
        }

        if(doctor){
            return done(null, doctor);
        }else{
            return done(null, false);
        }
    })
}));


module.exports = passport;
