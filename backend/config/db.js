import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://tijodevasia:9567369450@tijo.p1zqx.mongodb.net/?retryWrites=true&w=majority&appName=tijo').then(()=>console.log("DB Connected")
    )
}