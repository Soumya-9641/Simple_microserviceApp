const express = require("express");
const {randomBytes} = require("crypto");
const bodyParser = require('body-parser')
const cors = require("cors");
const axios = require("axios");
const app= express();
app.use(bodyParser.json());
app.use(cors());
const commentbyId ={}
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentbyId[req.params.id]||[]);  
    
})
app.post('/posts/:id/comments',async(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content}= req.body
    const comments = commentbyId[req.params.id] || []
    comments.push({id:commentId,content,status:"pending"});
    commentbyId[req.params.id] = comments;
    await axios.post("http://localhost:5002/events",{
        type:"CommentCreate",
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:"pending"
        }
    })
    res.status(201).send(comments)
})

app.post('/events',async(req,res)=>{
    console.log("recieved", req.body.type);

    const {type,data } = req.body;
    if(type==="CommentModerate"){
        const {postId,id,status,content} = data;
        const comments = commentbyId[postId];
        const comment = comments.find(comment=>{
            return comment.id === id;
        })
        comment.status=status;
        await axios.post("http://localhost:5002/events",{
            type:"CommentUpdated",
            data:{
                id,
                postId,
                content,
                status
            }
        })
    }

    res.send({})
})

app.listen(5001,(req,res)=>{
    console.log("App is running on port 5001")
})