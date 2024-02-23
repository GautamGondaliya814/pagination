var express = require('express');
var router = express.Router();
var registercontroller = require("../controller/login");
var auth = require('../middleware/auth')

/* GET home page. */
router.post('/register',registercontroller.register);
router.post('/login',registercontroller.login);

router.get('/',registercontroller.get_data);

module.exports = router;
