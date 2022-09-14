
const makeDblib=require("../library/db")

async function signup(username,email,password){
    const db=makeDblib.makeDb();
   
    try{
        const signupUser=await db.query("INSERT INTO signup_user(username,email,password) VALUES(?,?,?)",
        [username,email,password]);
        console.log(signupUser)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
    finally {
        await db.close()
    }
   
}


async function login(email,password){
    const db=makeDblib.makeDb();
  
    try{
      const  loginUser=await db.query("SELECT * FROM signup_user WHERE email = ? AND password = ? ",[email,password]);
      console.log(loginUser)
      return loginUser
    }
    catch(err){
        console.log(err)
        return err
    }
    finally {
        await db.close()
    }
 
}


async function getData(){
    const db=makeDblib.makeDb();

    try{

        const content= await db.query("SELECT * FROM content");
        console.log(content)
        return content
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}

module.exports={signup,login,getData}

