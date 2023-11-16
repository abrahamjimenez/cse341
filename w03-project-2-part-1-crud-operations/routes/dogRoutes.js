const express = require("express");
const dogsController = require("../controllers/dogsController");
const {dogRules, validate} = require("../utilities/dogValidation")

const router = express.Router();

// Routes
router.get("/", dogsController.getAllDogs);
router.get("/:id", dogsController.getDogById);
router.post("/", dogRules(), validate, dogsController.createDog);
router.put("/:id", dogRules(), validate, dogsController.updateDog);
router.patch("/:id", dogRules(), validate, dogsController.patchDog);
router.delete("/:id", dogsController.deleteDog);

module.exports = router;