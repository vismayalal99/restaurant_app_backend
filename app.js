const express=require('express');
const app=express();
const router=require("./src/routes/signupRoute")
const cors=require('cors')

app.use(express.json())
app.use(cors())

app.use("/images",express.static('uploads/Contents'));

app.use('/userdata',router);

app.listen(7000,(err)=>{
    console.log(err);
    console.log("ok");
})