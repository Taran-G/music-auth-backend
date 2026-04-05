const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');


router.post('/register',authcontroller.Register)
router.post('/login',authcontroller.Login)
        router.get('/logout',authcontroller.Logout);


module.exports = router;
