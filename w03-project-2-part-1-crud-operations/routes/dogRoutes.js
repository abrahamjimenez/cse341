const express = require("express");
const dogsController = require("../controllers/dogsController");

const router = express.Router();

// Routes
router.get("/", dogsController.getAllDogs);
router.get("/:id", dogsController.getDogById);
router.post("/", dogsController.createDog);
router.put("/:id", dogsController.updateDog);
router.patch("/:id", dogsController.patchDog);
router.delete("/:id", dogsController.deleteDog);

module.exports = router;