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
import {
  getAllHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse,
} from "../controllers/horsesController.js"
import {ensureAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ensureAuth, dashboard)

router
  .route("/animals/dogs")
  .get(getAllDogs)
  .post(ensureAuth, createDog)

router.route("/animals/dogs/:id")
  .get(getDogById)
  .put(ensureAuth, updateDog)
  .delete(ensureAuth, deleteDog)

router
  .route("/animals/horses")
  .get(getAllHorses)
  .post(ensureAuth, createHorse)

router.route("/animals/horses/:id")
  .get(getHorseById)
  .put(ensureAuth, updateHorse)
  .delete(ensureAuth, deleteHorse)

export default router