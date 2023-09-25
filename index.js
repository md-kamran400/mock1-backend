
const express = require("express");
const mongoose = require("mongoose")

const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { PostRouter } = require("./routes/post.route");
app.use(express.json())
app.use(cors());


const connect =async()=>{
    try {
        await mongoose.connect("mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/newdata?retryWrites=true&w=majority");
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

app.use("/users", userRouter),
app.use("/posts", PostRouter)

const PORT = 8080;
app.listen(PORT, ()=>{
    connect();
    console.log(`server is running ofn ${PORT}`);
});