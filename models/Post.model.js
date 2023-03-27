const mongoose=require("mongoose")


const PostSchema=mongoose.Schema({

    title: String,
    body : String,
    device : String,
    no_of_comments : Number,
    userID:String

})


const PostModel=mongoose.model("userpost",PostSchema)


module.exports={PostModel}