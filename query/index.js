const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const posts={}
app.get("/posts",(req,res)=>{
        res.send(posts);
})

app.post("/events",(req,res)=>{
    const {type,data} = req.body;

    if(type==="CreatePost"){
        const {id,title,post} = data;
        posts[id]={
                id,title,post,comments:[]
        }
    }
    if(type==="CommentCreate"){
            const {id,content,postId,status} = data;
            const post = posts[postId]
            post.comments.push({id,content,status})
    }
    console.log(posts)
    res.send({message:"Ok"})
})

app.listen(5003,()=>{
    console.log("app is listening on port 5003");
})