const bodyParser = require("body-parser");
const express = require ("express");
const axios = require("axios")
const app = express();
app.use(bodyParser.json());

app.post("/events",(req,res)=>{
    const event = req.body;

    axios.post("http://localhost:5000/events",event);
    axios.post("http://localhost:5001/events",event);
    axios.post("http://localhost:5003/events",event);
    axios.post("http://localhost:5005/events",event);

    res.send({status:"Ok"})
})

app.listen(5002,()=>{
    console.log("app us running on port 5002")
})