const express = require('express');
const { register, login ,getProfile , updateProfile } = require('../controllers/authController');
const router = express.Router();
const { protect } = require("../middleware/auth");


router.post('/register', register);
router.post('/login', login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


module.exports = router;
