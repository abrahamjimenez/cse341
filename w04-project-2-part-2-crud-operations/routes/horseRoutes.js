const express = require("express");
const horsesController = require("../controllers/horseController");
const {animalRules, validate} = require("../utilities/validation")

const router = express.Router();

// Routes
router.get("/", horsesController.getAllHorses);
router.get("/:id", horsesController.getHorseById);
router.post("/", animalRules(), validate, horsesController.createHorse);
router.put("/:id", animalRules(), validate, horsesController.updateHorse);
router.patch("/:id", animalRules(), validate, horsesController.patchHorse);
router.delete("/:id", horsesController.deleteHorse);

module.exports = router;