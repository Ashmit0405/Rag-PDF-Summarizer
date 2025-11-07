import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userroute } from "./src/routes/user.route.js";
import { sysrouter } from "./src/routes/system.route.js";
import { serv_router } from "./src/routes/service.route.js";

const app=express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","DELETE","PUT","OPTIONS"],
}));

app.use(cookieParser());
app.use(express.json({limit: "15kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use(userroute);
app.use(sysrouter);
app.use(serv_router)

export {app};