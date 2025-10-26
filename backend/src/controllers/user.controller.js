import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import axios from "axios";
import { options } from "../../constants.js";

const generateAccessTokenandRefreshToken=async(userid)=>{
    try {
        const user=await User.findById(userid);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken;

        const res=await user.save({validateBeforeSave: false});
        if(!res) throw new ApiError(500,"Failed to generate tokens");

        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiError(500,"Internal Server Error: " + error.message);
    }
}

const signup_login=asyncHandler(async (req,res)=>{
    const {code}=req.query;
    console.log("Google Code:", code);
    if(!code){
        return res.status(400).json(new ApiError(400,"Google Code is missing"));
    }

    const params=new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:8000/oauth/callback",
        code,
        grant_type: "authorization_code"
    })

    const token=await axios.post("https://oauth2.googleapis.com/token",params,
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).catch((error)=>{
        console.error("Error fetching Google tokens:", error.response?.data || error.message);
        return res.status(500).json(new ApiError(500,"Failed to fetch Google tokens"));
    });

    console.log(params.toString());

    console.log(token.data);
    const {access_token,refresh_token,expires_in,id_token}=token.data;
    console.log("Google Tokens:", {access_token,refresh_token,expires_in,id_token});
    if(!access_token||!expires_in||!id_token){
        return res.status(400).json(new ApiError(400,"Failed to get Google tokens"));
    }

    const decoded=jwt.decode(id_token);
    console.log(decoded);
    if(!decoded){
        console.log("Failed to decode Google ID token");
        return res.status(400).json(new ApiError(400,"Failed to decode Google ID token"));
    }
    
    let user=await User.findOne({googleId: decoded.sub});
    console.log("Found User:", user);
    if(!user){
        user=await User.create({
            username: decoded.name,
            email: decoded.email,
            googleId: decoded.sub,
            ...(refresh_token&&{googleRefreshToken: refresh_token}),
            googleAccessToken: access_token,
            expiry_token: new Date(Date.now() + expires_in * 1000)
        });
        console.log("Created User:", user);
        if(!user) return res.status(500).json(new ApiError(500,"Error Creating the User"));
    }
    else{
        user.googleAccessToken=access_token;
        if(refresh_token) user.googleRefreshToken=refresh_token;
        user.expiry_token=new Date(Date.now() + expires_in * 1000);
        await user.save({validateBeforeSave: false});
    }
    const {accessToken,refreshToken}=await generateAccessTokenandRefreshToken(user?._id);
    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200,"User authenticated successfully",{
        user: user,accessToken,refreshToken
    }));
})

const refresh_access_token=asyncHandler(async(req,res)=>{
    const incomerefresh=req.cookies.refreshToken;
    if(!incomerefresh) return new ApiError(401,"Unauthorized Token");
    try {
        const decoded=jwt.verify(incomerefresh,process.env.REFRESH_TOKEN_SECRET);
        const user=await User.findById(decoded?._id);
        if(!user) throw new ApiError(401,"User not exists");
        if(!user.refreshToken) throw new ApiError(404,"User Logged Out");
        if(user.refreshToken!==incomerefresh) throw new ApiError(401,"Invalid refresh token");

        const {accessToken,refreshToken}=await generateAccessTokenandRefreshToken(user._id);
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(200,"Access token refreshed successfully",{accessToken,refreshToken}));
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid Refresh Token");
    }
})

const getAccessToken=async(user)=>{
    const curr=new Date();
    try {
        if(!user.expiry_token||user.expiry_token<curr){
            const tokens=await refreshGoogleAccessToken(user);
            user.googleAccessToken=tokens.access_token;
            user.expiry_token=new Date(Date.now()+tokens.expires_in*1000);
            await user.save({validateBeforeSave: false});
        }
        return user.googleAccessToken;
    } catch (err) {
        if(err?.response?.data?.error==="invalid_grant"){
            throw new ApiError(405,"Refresh Token Expired. Please Login Again.")
        }
        throw new ApiError(500,"Failed to get Access Token");
    }
}

const refreshGoogleAccessToken=async(user)=>{
    const params=new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: user.googleRefreshToken,
        grant_type: "refresh_token"
    });

    const token=await axios.post("https://oauth2.googleapis.com/token",
        params,
        {headers:{"Content-Type": "application/x-www-form-urlencoded"}});

    return token.data;
}

const getuserInfo=asyncHandler(async (req,res)=>{
    const userid=req.user?._id;
    const user=await User.findById(userid);
    if(!user) return res.status(404).json(new ApiError(404,"User Not Found"));
    const accessToken=await getAccessToken(user);
    try{
        const response=await axios.get("https://people.googleapis.com/v1/people/me",
            {
                params:{
                    personFields: "names,emailAddresses,photos,phoneNumbers,addresses,birthdays",
                },
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            }

        );
        return res.status(200).json(new ApiResponse(200,response.data,"User Info Fetched Successfully"));
    }
    catch(error){
        console.log(error);
        return res.status(401).json(new ApiError(401,"Error fetching the user"));
    }
})

const logout=asyncHandler(async(req,res)=>{
    const userid=req.user?._id;
    await User.findByIdAndUpdate(userid,{
        $unset:{
            refreshToken: 1
        }
    },{
        new: true,   
    })

    res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,"User logged out successfully"));
})

export {signup_login,refresh_access_token,getuserInfo,logout};