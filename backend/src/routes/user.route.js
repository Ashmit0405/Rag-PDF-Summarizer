import { Router } from "express";
import { changepass, getcurruser,registerUser,login,logout, changedetails,refresh_access_token} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const userroute=Router();

// userroute.get("/oauth/callback",signup_login);
// userroute.post("/logout",jwtVerify,logout);
// userroute.get("/profile",jwtVerify,getuserInfo);
// userroute.post("/refresh-token",refresh_access_token)
userroute.post("/register",registerUser);
userroute.post("/login",login);
userroute.post("/logout",jwtVerify,logout);
userroute.get("/profile",jwtVerify,getcurruser)
userroute.post("/change-password",jwtVerify,changepass)
userroute.post("/change-details",jwtVerify,changedetails)
userroute.post("/refresh-token",refresh_access_token)
export { userroute };