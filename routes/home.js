var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Readaway' });
});

router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/', //update the route if you must
    failureRedirect: '/'  // for both
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/'); //update the reroute if you must
  });
});

module.exports = router;
