import express from "express";
import {
  googleAuthenticate,
  googleCallback,
  redirect
} from "../controllers/authController.js";

const router = express.Router();

router
  .route("/google")
  .get(googleAuthenticate)

router
  .route("/google/callback")
  .get(googleCallback, redirect)

export default router