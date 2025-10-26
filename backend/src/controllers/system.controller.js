import { asyncHandler } from "../utils/asyncHandler.js";

const systemstatus=asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,"System is up to date"));
})

export {systemstatus};