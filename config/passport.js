const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

passport.use(new GoogleStrategy(
    //configuration object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    //verifyied call back function
    //LETS USE asyn await
    async function(accessToken, refreshToken, profile, cb) {
        //A user has loggined in with oauth
        try {
            let user = await User.findOne({ googleId: profile.id });
            //existung user found
            if (user) return cb(null, user);
            //we have a new user OAuth
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return cb(null, user);
        }   catch (err) {
            return cb(err);
        }
   }
));

passport.serializeUser(function(user, cb) {
    //what should we put in the session to find user doc in the future
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    // after the request come from Oauth user when will provide passoport with the document
cb(null, await User.findById(userId));
});