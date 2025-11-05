import axiosInstance from "./axiosInstance.js";

export const uploadIngest=async(formdata)=>{
    const res= await axiosInstance.post("/upload-ingest",formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
    return res.data;
}

export const get_summary=async(chat_id,persona,job)=>{
    const res=await axiosInstance.post(`/summary/${chat_id}`,{
        persona,
        job
    })

    return res.data;
}

export const sendquery=async(chat_id,query,top_k=3)=>{
    const res=await axiosInstance.post(`/query/${chat_id}`,{
        query,
        top_k
    })
    return res.data;
}

export const gethistory=async()=>{
    const res=await axiosInstance.get("/history");
    return res.data;
}

export const getchats=async(chat_id)=>{
    const res=await axiosInstance.get(`/chats/${chat_id}`);
    return res.data;
}

export const deletechat=async(chat_id)=>{
    const res=await axiosInstance.delete(`/delete-chat/${chat_id}`);
    return res.data
}