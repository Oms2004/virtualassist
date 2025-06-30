import express from "express";
import { signUp, Login, logOut } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", signUp);

// POST /api/auth/signin
authRouter.post("/signin", Login);

// POST /api/auth/logout
authRouter.post("/logout", logOut);

export default authRouter;
