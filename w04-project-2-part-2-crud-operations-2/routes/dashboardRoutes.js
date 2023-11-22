import express from "express";
import {
  dashboard,
} from "../controllers/dashboardController.js";
import {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} from "../controllers/dogsController.js";
import {ensureAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ensureAuth, dashboard)

router
  .route("/animals/dogs")
  .get(getAllDogs)
  .post(createDog)

router.route("/animals/dogs/:id")
  .get(getDogById)
  .put(updateDog)
  .delete(deleteDog)


export default router