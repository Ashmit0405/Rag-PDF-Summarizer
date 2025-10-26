import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const jwtVerify=asyncHandler(async (req,res,next)=>{
    try {
        const token=req.cookies.accessToken||req.header("Authorization")?.replace("Bearer","");
        if(!token) throw new ApiError(401,"Token Not Found");
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(!decoded?._id) throw new ApiError(401,"Invalid Token");

        const user=await User.findById(decoded._id);
        if(!user) throw new ApiError(401,"User not found");
        req.user=user;
        next();
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            throw new ApiError(401,"Token Expired");
        }
        throw new ApiError(401,error?.message||"Unauthorized Access");
    }
})

export {jwtVerify};