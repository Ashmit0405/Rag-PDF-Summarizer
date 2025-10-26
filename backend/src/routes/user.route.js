import { Router } from "express";
import { getuserInfo, logout, refresh_access_token, signup_login } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const userroute=Router();

userroute.get("/oauth/callback",signup_login);
userroute.post("/logout",jwtVerify,logout);
userroute.get("/profile",jwtVerify,getuserInfo);
userroute.post("/refresh-token",refresh_access_token)

export { userroute };