var express = require('express');
const usersController = require('../controller/usersController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;
