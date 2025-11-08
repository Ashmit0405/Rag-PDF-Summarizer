import mongoose, { Schema } from "mongoose";

const qnaschema=new Schema({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    role:{
        type: String,
        enum:["agent","customer"],
        required: true
    },
    content:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
},{
    timestamps: true
})

export const QNA=mongoose.model("QNA",qnaschema);