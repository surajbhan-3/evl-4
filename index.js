const express=require("express")
const {connection}=require("./config/db")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {authenticae}=require("./middleware/authenticate.middleware")
const { postRouter } = require("./routes/Post.routes")
const {userRouter}=require("./routes/User.routes")


const app=express()
app.use(express.json())



app.get("/",async(req,res)=>{

      try {
        res.status(200).send("Home page")
      } catch (error) {
        res.send("Error")
      }
})

 app.use("/users",userRouter)
 app.use(authenticae)

 app.use("/posts",postRouter)






app.listen(process.env.port,async(req,res)=>{


     try {
        await connection
     } catch (error) {

        res.send("Eror")
        
     }
     console.log("Server is Running")
})

