import express from "express";
import {
  googleAuthenticate,
  googleCallback,
  logout,
  dashboardRedirect
} from "../controllers/authController.js";

const router = express.Router();

router
  .route("/google")
  .get(googleAuthenticate)

router
  .route("/google/callback")
  .get(googleCallback, dashboardRedirect)

router
  .route("/logout")
  .get(logout)

export default router