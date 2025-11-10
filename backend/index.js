import dotenv from "dotenv"
import { app } from "./app.js"
import connectDb from "./src/db/connectDb.js";

dotenv.config({
    path: "./.env"
});
const port=process.env.PORT||3000;

//405-refresh token of google gone make the frontend login again
//409-token expired
console.log(process.env.NODE_ENV)
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
