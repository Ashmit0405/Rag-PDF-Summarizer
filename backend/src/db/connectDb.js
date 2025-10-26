import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDb=async ()=>{
    try {
        const connectIns=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log(`Connected to the db ${connectIns.connection.host} on port ${connectIns.connection.port}`);
    } catch (error) {
        console.log("Error connecting to the db");
        process.exit(1);
    }
}
export default connectDb;