require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.get('/', (req,res)=>{
    res.json({message: "API is working"})
})

app.use('/api/finance', require('./routes/finance.routes'));


app.listen(port, () => {console.log(`Server is running on port ${port}`) });