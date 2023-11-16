const express = require("express");
const dogsController = require("../controllers/dogsController");
const {ObjectId} = require("mongodb");
const {getDb, connectToDb} = require("../db/database");

const router = express.Router();

// Database connection
let database;
connectToDb((error) => {
  if (!error) {
    database = getDb();
  }
});

// Routes
router.get("/", dogsController.getAllDogs);
router.get("/:id", dogsController.getDogById);
router.post("/", dogsController.createDog);
router.put("/:id", dogsController.updateDog);
router.patch("/:id", dogsController.patchDog);
router.delete("/:id", dogsController.deleteDog);

module.exports = router;