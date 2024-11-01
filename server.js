const express=require('express');
const { handleMessage } = require('./controller/handleMessage');
const app = express();
const PORT = process.env.PORT || 3001
app.get('/',handleMessage);
app.get('/testing',(req,res)=>{
    res.status(200).send("Iam running")
})
app.listen(PORT,()=>{
    console.log("app running on port 3000")
})