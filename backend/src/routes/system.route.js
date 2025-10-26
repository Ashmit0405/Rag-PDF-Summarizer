import { Router } from "express";
import { systemstatus } from "../controllers/system.controller.js";

const sysrouter=Router();

sysrouter.get("/system-status",systemstatus);
export {sysrouter};