const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());
const posts={}
app.get("/posts",(req,res)=>{
        res.send(posts);
})

const handleEvents=(type,data)=>{
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
   // console.log(posts)

    if(type === "CommentUpdated"){
        const {postId,id,status,content} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment=>{
            return comment.id === id;
        })
        comment.status=status;
        comment.content = content  
    }
}

app.post("/events",(req,res)=>{
    const {type,data} = req.body;

    handleEvents(type,data)
    res.send({message:"Ok"})
})

app.listen(5003,async()=>{
    console.log("app is listening on port 5003");

    try {
        const res = await axios.get("http://event-bus-srv:5002/events");
    
        for (let event of res.data) {
          console.log("Processing event:", event.type);
    
          handleEvents(event.type, event.data);
        }
      } catch (error) {
        console.log(error.message);
      }
})