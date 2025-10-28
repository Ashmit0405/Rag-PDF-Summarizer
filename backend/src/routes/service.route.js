import {Router} from "express"
import {jwtVerify} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import {deletechat, fileupload_ingestion, get_summary, getchats, gethistory, resolve_query} from "../controllers/services.controller.js"

const serv_router=Router();

serv_router.route("/upload-ingest").post(jwtVerify,
    upload.single("pdf"),
    fileupload_ingestion);

serv_router.route("/summary/:chat_id").post(jwtVerify,get_summary);
serv_router.route("/query/:chat_id").post(jwtVerify,resolve_query);
serv_router.route("/history").get(jwtVerify,gethistory);
serv_router.route("/chats/:chat_id").get(jwtVerify,getchats);
serv_router.route("/delete-chat/:chat_id").delete(jwtVerify,deletechat);

export {serv_router}