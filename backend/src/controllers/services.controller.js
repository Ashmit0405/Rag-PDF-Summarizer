import axios from "axios";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deletefile, getsignedurl, uploadfile } from "../utils/fileUpload.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { QNA } from "../models/qna.model.js";

const fileupload_ingestion=asyncHandler(async (req,res)=>{
    const user_id=req.user?._id;
    const {title,description}=req.body;
    const localpath=req.file?.path;
    if(!title||!localpath) return res.status(400).json(new ApiError(400,"Fields missing"));
    if(!localpath) return res.status(400).json(new ApiError(400,"File Not Found"));

    const uploaded=await uploadfile(localpath);
    if(!uploaded) return res.status(400).json(new ApiError(400,"Error uploading the file"));

    const chat=await Chat.create({
        user:user_id,
        title: title,
        description: description,
        pdf: uploaded.secure_url,
        pdf_public_id:uploaded.public_id,
        summary: ""
    });
    if(!chat) return res.status(500).json(new ApiError(500,"Error creating the chat"));

    const id=chat._id;
    const pdf_url=getsignedurl(uploaded.public_id,"raw","pdf");

    try {
        const ingest_response=await axios.post(`${process.env.AI_SERVICE_BASE_URL}/ingest`,{user_id: user_id,chat_id: id,pdf_url: pdf_url});

        if(!ingest_response?.data) throw new ApiError(400,"Error communicating to the backend");

        return res.status(200).json(new ApiResponse(200,chat,"Pdf successfully ingested and uploaded"));
    } catch (error) {
        const chat=await Chat.findByIdAndDelete(id);
        console.log(error)
        throw new ApiError(400,"Error communicating to the ai service",error);
    }
})

const get_summary=asyncHandler(async(req,res)=>{
    const {chat_id}=req.params
    const {persona,job}=req.body;
    if(!chat_id||!persona||!job) return res.status(400).json(new ApiError(400,"Some Fields missing"));

    const chat=await Chat.findById(chat_id);
    if(!chat) return res.status(400).json(new ApiError(400,"Invalid Chat id"));

    const pdf_url=getsignedurl(chat.pdf_public_id,"raw","pdf");
    if(!pdf_url) return res.status(400).json(new ApiError(400,"Pdf Url missing"));

    try {
        const summary_response=await axios.post(`${process.env.AI_SERVICE_BASE_URL}/summary`,{pdf_url,persona,job});
        if(!summary_response?.data) throw new ApiError(400,"Error getting the summary");
        
        const newchat=await Chat.findByIdAndUpdate(chat_id,{
            $set:{
                summary: summary_response.data.summary
            }
        },{
            new: true
        })

        if(!newchat) return res.status(401).json(new ApiError(401,"Error updating the database"));
        return res.status(200).json(new ApiResponse(200,summary_response.data.summary,"Summary fetched successfully"));
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Error communicating to the ai server",error);
    }
})

const resolve_query=asyncHandler(async(req,res)=>{
    const {chat_id}=req.params;
    const user_id=req.user?._id;
    const {query,top_k=5}=req.body;
    if(!query?.trim()) return res.status(400).json(new ApiError(400,"Query Not Found"));
    if(!chat_id) return res.status(400).json(new ApiError(400,"Chat Id Not Found"));

    const qna_sender=await QNA.create({
        chat: chat_id,
        role:"customer",
        content:query
    })
    if(!qna_sender) throw new ApiError(500,"Error saving the chat");
    
    try {
        const result=await axios.post(`${process.env.AI_SERVICE_BASE_URL}/query`,
            {
                query,
                top_k,
                user_id,
                chat_id
            },
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        );

        if(!result?.data) throw new ApiError(500,"Error communicating the ai service");
        const qna_answer=await QNA.create({
            chat: chat_id,
            role: "agent",
            content: result.data.answer
        })
        if(!qna_answer) return res.status(500).json(new ApiError(500,"Error saving the chats"));
        return res.status(200).json(new ApiResponse(200,result.data,"The Rationals fetched successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"AI service error",error)
    }
})

const deletechat=asyncHandler(async(req,res)=>{
    const {chat_id}=req.params;
    const del=await Chat.findByIdAndDelete(chat_id);

    if(!del) return res.status(400).json(new ApiError(400,"No Document To Delete"));

    const resp=await deletefile(del.pdf_public_id);
    if(resp.result!="ok") return res.status(400).json(new ApiError(400,"Error deleting the cloudinary file"));

    return res.status(200).json(new ApiResponse(200,"Chat deleted Successfully"));
})

const gethistory=asyncHandler(async (req,res)=>{
    const user_id=req.user?._id;
    if(!user_id) return res.status(400).json(new ApiError(400,"Invalid User"));

    const history=await Chat.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(user_id)
            }
        },
        {
            $sort:{
                createdAt: -1
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200,history,"History Fetched Successfully"));
})

const getchats=asyncHandler(async(req,res)=>{
    const {chat_id}=req.params;
    if(!chat_id) return res.status(400).json(new ApiError(400,"Chat Id Not Found"));

    const chats=await QNA.aggregate([
        {
            $match:{
                chat: new mongoose.Types.ObjectId(chat_id)
            }
        },
        {
            $sort:{
                createdAt: 1
            }
        }
    ])
    return res.status(200).json(new ApiResponse(200,chats,"Chats Fetched Successfully"))
})

export {get_summary,getchats,gethistory,fileupload_ingestion,deletechat,resolve_query}