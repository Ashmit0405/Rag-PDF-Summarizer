import mongoose, { Schema } from "mongoose";

const chatschema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
        default: ""
    },
    pdf:{
        type: String,
        required: true
    },
    pdf_public_id:{
        type: String,
        required: true
    },
    summary:{
        type: String,
    }
},{
    timestamps: true
})

export const Chat=mongoose.model("Chat",chatschema);