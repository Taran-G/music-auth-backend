const express = require('express')
const authMiddleware  = require('../middlewares/auth.middleware')
const router = express.Router();
const musicController = require('../controllers/music.controller')
const multer = require('multer');
const music = require('../models/musicModel');
const upload =multer({
    storage:multer.memoryStorage()
})
    router.post('/upload',upload.single('music'),musicController.createMusic);
    router.get('/',authMiddleware.authUser,musicController.listenSongs);




module.exports = router;