const express = require("express");
const {randomBytes} = require("crypto");
const bodyParser = require('body-parser')
const cors = require("cors");
const axios = require("axios");
const app= express();
app.use(bodyParser.json());
app.use(cors());
const posts ={}
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.get("/posts",(req,res)=>{
    res.send(posts);
})
app.post("/posts",async(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title,post} = req.body
    posts[id]={
       id, title,post   
    };
    await axios.post("http://localhost:5002/events",{
        type:"CreatePost",
        data:{
            id,
            title,
            post
        }
    })
    res.status(201).send(posts[id]);
    })
   
 app.post('/events',(req,res)=>{
    console.log("event recieved" , req.body.type);

    res.send({})
})

app.listen(5000,(req,res)=>{
    console.log("App is running on port 5000")
})