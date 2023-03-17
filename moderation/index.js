const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.post("/events",async(req,res)=>{
    const {type,data} = req.body;
    if(type==="CommentCreate"){
        const status = data.content.includes("orange")?"rejected":"aproved"
        await axios.post("http://localhost:5002/events",{
        type:"CommentModerate",
        data:{
            id:data.id,
            postId:data.postId,
            status,
            content:data.content
        }
    })
    }
    res.send({})
})

app.listen(5005,()=>{
    console.log("app is running on port 5005");
})