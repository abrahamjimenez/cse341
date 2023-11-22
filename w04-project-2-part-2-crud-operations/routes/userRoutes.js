const express = require("express");
const {animalRules, validate} = require("../utilities/validation")
const userController = require("../controllers/userController");

const router = express.Router();

// Routes

//  @desc  Register new user
//  @route GET /user/login
//  @access Public
router.get("/login", userController.login);

//  @desc Logout user
//  @route GET /user/logout
//  @access Private
router.get("/logout", userController.logout);

module.exports = router;