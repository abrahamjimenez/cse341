import express from "express";
import {
  dashboard,
} from "../controllers/dashboardController.js";
import {ensureAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ensureAuth, dashboard)

export default router