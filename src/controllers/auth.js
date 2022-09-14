const postData = require("../model/auth");
const jwt=require("jsonwebtoken")


async function signup(req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let validateError = false;
    console.log(username);
    if (!username) {
      res.status(200).send({ success: false, message: "Invalid username" });
      validateError = true;
    }
    if (!email) {
      res.status(200).send({ success: false, message: "Invalid Email" });
      validateError = true;
    }

    if (!password) {
      res.status(200).send({ success: false, message: "Invalid Password" });
      validateError = true;
    }
    
    if (!validateError) {
      await postData.signup(username, email, password);
      return res.status(200).json({ success: true, message: "User is registered successfully"});
    }

  } 
  catch (err) {
    return res.status(500).json({ message: "error found" });
  }
}




async function login(req, res) {

  try {
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
    return res.status(500).json({ message: "error" });
  }
}



async function getData(req, res) {

  try {
       const data=  await postData.getData();
       return res.status(200).send({success:true,message:"Success",data:data})
      
  } 

  catch (err) {
    return res.status(500).json({ success:false,message:"Error found" });
  }
}


module.exports = { signup,login,getData}