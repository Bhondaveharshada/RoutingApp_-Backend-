const express = require('express')
const router = express.Router()
const {handleAddUser} = require("../controller/register")
const {handleUserLogin} = require("../controller/login")

router.post('/register',handleAddUser);
router.post('/login',handleUserLogin)
module.exports = router;