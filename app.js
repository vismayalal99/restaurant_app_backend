const express=require('express');
const app=express();
const router=require("./src/routes/signupRoute");

// const cors=require('cors')
// app.use(cors())

app.use(express.json())

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use("/images",express.static('uploads/Contents'));

app.use('/userdata',router);

app.listen(7000,(err)=>{
    console.log(err);
    console.log("ok");
})