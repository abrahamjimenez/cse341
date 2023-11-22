const express = require("express");
const dogsController = require("../controllers/dogsController");
const {animalRules, validate} = require("../utilities/validation")
const passport = require('passport');

const router = express.Router();

// Routes
router.get("/", passport.authenticate('bearer', { session: false }), dogsController.getAllDogs);
router.get("/:id", dogsController.getDogById);
router.post("/", animalRules(), validate, dogsController.createDog);
router.put("/:id", animalRules(), validate, dogsController.updateDog);
router.patch("/:id", animalRules(), validate, dogsController.patchDog);
router.delete("/:id", dogsController.deleteDog);

module.exports = router;