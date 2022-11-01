require("dotenv").config();


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const corsConfig = {
    origin: true,
    credentials: true,
};
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.get('/', (req,res)=>{
    res.json({message: "API is working"});
})


app.use('/api/users',require('./routes/user.routes'));


app.listen(port, () => {console.log(`Server is running on port ${port}`) });