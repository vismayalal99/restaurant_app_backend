const express=require('express');
const app=express();
const router=require("./src/routes/routes");
const config=require("./config")


app.use(express.json())


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use("/images",express.static('uploads/Contents'));

app.use('/userdata',router);

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.listen(config.PORT,config.HOST,()=>{
    console.log(`App listening port is ${config.HOST}:${config.PORT}`);
})

