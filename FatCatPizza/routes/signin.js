var express = require('express');
var fs = require('fs');
var router = express.Router();

var users = require('./../users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("sending...");
  res.render('signin', {
    users: users.users});
});

router.post('/currentuser', function(req, res) {
  var currentuser = req.body;
  var string = JSON.stringify(currentuser, null, 2);
  fs.writeFile('./current-user.json', string, function (err) {
    if(err) {
      console.log(err);
    }
    else
    {
      console.log("File Saved");
      res.send();
    }
  });
});

module.exports = router;
