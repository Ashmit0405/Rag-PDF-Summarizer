import dotenv from "dotenv"
import { app } from "./app.js"
import connectDb from "./src/db/connectDb.js";

dotenv.config();
const port=process.env.PORT||3000;

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err)=>{
    console.error("Error connecting to the database:", err);
    process.exit(1);
});
