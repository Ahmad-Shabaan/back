const express = require("express");
const cors = require('cors');
const app = express();
const { readData, writeData } = require('./data');
app.use(cors());
require('dotenv').config();
const port = process.env.PORT || 8000;
// const {readdirSync} = require("fs");
// readdirSync("./routes").map((file)=>app.use("/",require("./routes/"+file)))

// app.get("/",(req,res)=>{
//     res.send("products");
// });


app.get('/products', (req, res) => {
    const data = readData();
    res.json(data);
  });
  
  app.post('/products', (req, res) => {
    const data = readData();
    const product = req.body;
    data.push(product);
    writeData(data);
    res.json(product);
  });


app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
})