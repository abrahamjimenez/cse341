import {
  loginUser,
  logoutUser,
  registerUser
} from "../controllers/userControllers.js";

import express from "express";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
router
  .route("/login")
  .post(loginUser);
router
  .route("/logout")
  .post(logoutUser);

export default router