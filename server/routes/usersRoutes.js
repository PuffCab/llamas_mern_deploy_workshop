import express from "express";
import {
  getProfile,
  imageUpload,
  login,
  registerNewUser,
} from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";

import jwtAuth from "../middleware/jwtAuth.js";
const userRouter = express.Router();

userRouter.post("/uploadImage", multerUpload.single("image"), imageUpload);

userRouter.post("/register", registerNewUser);
userRouter.post("/login", login);
userRouter.get("/profile", jwtAuth, getProfile);
// userRouter.get("/profile", getProfile);

export default userRouter;
