const postData = require("../model/auth");
const jwt=require("jsonwebtoken")


async function signup(req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const lastname=req.body.lastname;
    const phone=req.body.phone
  
    console.log(username);
    if (!username || !email || !password || !lastname || !phone ) {
      res.status(400).send({ success: false, message: "Enter valid Inputs" });
     
    }
    
    else  {
    const data=  await postData.signup(username, email, password,lastname,phone);
   
    if(data){
      return res.status(200).json({ success: true, message: "User is registered successfully"});
    }
    else{
      return res.status(401).json({ success: false, message: "Email is alredy exist"});
    }
  }

  } 
  catch (err) {
    return res.status(500).json({ message: "error found" });
  }
}




async function login(req, res) {

  try {
    console.log("login");
    const password = req.body.password;
    const email = req.body.email;
    let data = await postData.login(email,password) ;
    let user = data.map( (item) => item.id)
    let userId={id:user}
    if(data.length != 0){

       const token=jwt.sign({userId},'my_secret_key',{expiresIn:"2d"});
       return res.status(200).send({success:true,message:"User logged Successfully",data:data, token:token})

    }
    else{
       return res.status(401).send({success:false,message:"User is not registered"})
    }  
  } 

  catch (err) {
    return res.status(500).json({ message: err });
  }
}



async function getData(req, res) {
console.log("auth");
  try {
       const data=  await postData.getData();
       return res.status(200).send({success:true,message:"Success",data:data})
      
  } 

  catch (err) {
    return res.status(500).json({ success:false,message:"Error found" });
  }
}


module.exports = { signup,login,getData}