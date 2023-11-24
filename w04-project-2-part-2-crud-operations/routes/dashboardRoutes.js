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
import {dogValidationRoutes, horseValidationRoutes, validate} from "../middleware/validatorMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(
    // #swagger.ignore = true
    dashboard
  )

router
  .route("/animals/dogs")
  .get(
    // #swagger.tags = ['Dogs']
    getAllDogs
  )
  .post(
    // #swagger.tags = ['Dogs']
    ensureAuth,
    dogValidationRoutes(),
    validate,
    createDog
  )

router.route("/animals/dogs/:id")
  .get(
    // #swagger.tags = ['Dogs']
    getDogById
  )
  .put(
    // #swagger.tags = ['Dogs']
    ensureAuth,
    dogValidationRoutes(),
    validate,
    updateDog
  )
  .delete(
    // #swagger.tags = ['Dogs']
    ensureAuth,
    deleteDog
  )

router
  .route("/animals/horses")
  .get(
    // #swagger.tags = ['Horses']
    getAllHorses
  )
  .post(
    // #swagger.tags = ['Horses']
    ensureAuth,
    horseValidationRoutes(),
    validate,
    createHorse
  )

router.route("/animals/horses/:id")
  .get(
    // #swagger.tags = ['Horses']
    getHorseById
  )
  .put(
    // #swagger.tags = ['Horses']
    ensureAuth,
    horseValidationRoutes(),
    validate,
    updateHorse
  )
  .delete(
    // #swagger.tags = ['Horses']
    ensureAuth,
    deleteHorse
  )

export default router