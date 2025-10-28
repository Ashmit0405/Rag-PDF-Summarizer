import { v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
import fs from "fs"
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  
})

const uploadfile=async (localpath)=>{
    try {
        if (!localpath) {
            return null
        } 
        console.log("Uploading from local path:", localpath);
        const upload=await cloudinary.uploader.upload(localpath,{
            resource_type:"raw",
        });
        console.log("File is uploaded.",upload.url)
        fs.unlinkSync(localpath)
        return upload
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localpath)
        return null
    }
}

const deletefile=async(public_id,resource_type="raw")=>{
    try{
        if(!public_id) return null

        const res=await cloudinary.uploader.destroy(public_id,{
            resource_type: `${resource_type}`
        });
        return res;
    }
    catch(error){
        console.log("Upload Failed on Cloudinary")
        return error;
    }
}

const getsignedurl = (public_id, resource_type = "raw", format = "pdf") => {
  try {
    if (!public_id) return null;

    const res = cloudinary.utils.private_download_url(public_id, format, {
      resource_type,
      type: "upload",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    });

    console.log("Generated signed URL:", res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {uploadfile,deletefile,getsignedurl}