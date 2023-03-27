const express=require("express")
const postRouter=express.Router()
const {PostModel}=require("../models/Post.model")

const bcrypt=require("bcrypt")



postRouter.get("/allpost",async(req,res)=>{

      try {
        res.send("hello")
      } catch (error) {
        res.send("error")
      }
})


postRouter.post("/add",async(req,res)=>{

    try {
        const payload=req.body
        console.log(payload)
        const postCreate= new PostModel(payload)
        await postCreate.save()
        res.send(postCreate)
    } catch (error) {
        res.send({"msg":error.message})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const ID=req.params.id
   
    const findpost=await PostModel.findOne({"_id":ID})
    console.log(findpost)
    const userid_in_post=findpost.userID
    const userID_in_makignreq=req.body.userID
    // console.log(userid_in_post)
    // console.log(userID_in_makignreq)
    try {
        if(userID_in_makignreq!==userid_in_post){
            res.send("unauthoreised")
        }else{
            
            await PostModel.findByIdAndUpdate({"_id":ID},payload)
            res.send("updated")
        }

    } catch (error) {
        
    res.send("erron in patch")
    }
})




postRouter.delete("/delete/:id",async(req,res)=>{
    const payload=req.body
    const ID=req.params.id
    const findpost=await PostModel.findOne({"_id":ID})
    const userid_in_post=findpost.userID
    const userID_in_makignreq=req.body.userID
    try {
        if(userID_in_makignreq!==userid_in_post){
            res.send("unauthoreised")
        }else{
            
            await PostModel.findByIdAndDelete({"_id":ID},payload)
            res.send("Deleted")
        }

    } catch (error) {
        
    res.send("erron in patch")
    }
})








module.exports={postRouter}