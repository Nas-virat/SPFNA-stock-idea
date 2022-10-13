require("dotenv").config();


const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

app.get('/', (req,res)=>{
    res.json({message: "API is working"})
})


app.listen(port, () => {
     console.log(`Server is running on port ${port}`) 
    });