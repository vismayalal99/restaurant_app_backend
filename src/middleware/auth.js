const jwt = require("jsonwebtoken");



async function validateToken(req, res, next) {
  
  const authHeader = req.headers.authorization;
 
  if (!authHeader) {
    console.log("no token")
    return res.status(400).json({ success: false, message: "User not authenticated.. " });
  }
 
  try {
   
    const validToken = jwt.verify(authHeader, "my_secret_key");
    console.log("test")
    if (validToken) {
      return next();
    }
    else{
      return res.status(400).json({ success: false, message: "User not authenticated.. " });
    }
    
   } 
  catch (err) {
    console.log(err)
    return res.status(500).json({success: false, message: err });
  }
}

module.exports = { validateToken };