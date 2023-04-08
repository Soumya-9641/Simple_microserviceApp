const bodyParser = require("body-parser");
const express = require ("express");
const axios = require("axios")
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
const events =[];
app.post("/events",(req,res)=>{
    const event = req.body;
    events.push(event)
    axios.post("http://posts-clusterip-srv:5000/events",event).catch((err)=>{
        console.log(err.message) 
    });
    axios.post("http://comments-srv :5001/events",event).catch((err)=>{
        console.log(err.message)
    });
    axios.post("http://query-srv :5003/events",event).catch((err)=>{
        console.log(err.message)
    });
    axios.post("http://moderation-srv:5005/events",event).catch((err)=>{
        console.log(err.message)
    });

    res.send({status:"Ok"})
})

app.get("/events",(req,res)=>{
    res.send(events)
})

app.listen(5002,()=>{
    console.log("app us running on port 5002")
})