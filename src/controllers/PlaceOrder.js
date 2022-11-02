
const order=require("../model/placeOrder")


async function placeOrder(req,res){
 
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const phoneNo=req.body.phoneNo;
    const menuItem=req.body.menuItem;
    const price=req.body.price;
    const quantity=req.body.quantity;
    const section=req.body.section;
    const payment=req.body.value;
    const user_id=req.body.user_id;
    console.log(user_id);
    const image=req.body.image;
    const menuId=req.body.menuId
   
    try{
       
        if(firstName !="" && lastName !="" && email !="" && phoneNo !="" && menuItem !="" && price !="" && quantity !=""){
            
            const data =await order.placeOrder(firstName,lastName,email,phoneNo,menuItem,price,payment,user_id,quantity,section,image,menuId);
           
            if(data){
            return res.status(200).send({success:true,message:"Order Placed"})
            }
            else{
                return res.status(400).send({success:false,message:"Something wrong"})
            }
        } 
        else{
            return res.status(400).send({success:false,message:"Enter valid inputs"})
        }
    }

    catch(err){
        console.log(err);
        return res.status(500).send({success:false,message:err})
    }
}




async function orderAll(req,res){

    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const phoneNo=req.body.phoneNo;
    const menuItems=req.body.cartDatas;
    const total=req.body.total;
    const payment=req.body.payment;
    const user_id=req.body.user_id;
    console.log(user_id);

   
    try{
       
        if(firstName !="" && lastName !="" && email !="" && phoneNo !="" && menuItems !="" ){
            
            const data =await order.placeOrder(firstName,lastName,email,phoneNo,menuItems,total,payment,user_id)
            console.log("data"+data);
           
            if(data){
                return res.status(200).send({success:true,message:"Order Placed"})
                }
                else{
                    return res.status(400).send({success:false,message:"Something wrong"})
                }
        } 
        else{
            return res.status(400).send({success:false,message:"Enter valid inputs"})
        }
    }

    catch(err){
        console.log("error "+ err);
        return res.status(500).send({success:false,message:err})
    }

}




async function orderDetails(req,res){

    try{
        const data=await order.orderDetails()
        return res.status(200).send({success:true,message:"success",data:data})
    }
    catch(err){
        return res.status(500).send({success:false,message:err})
    }

}



async function paymentMethod(req,res){

    try{
        const data=await order.paymentMethod()
        return res.status(200).send({success:true,message:"success",data:data})
    }
    catch(err){
        return res.status(500).send({success:false,message:err})
    }

}

async function quantityIncrement(req,res){
    const id=req.body.id;
    const menuId=req.body.menuId
    try{
        const data=await order.quantityincrement(id,menuId)
        return res.status(200).send({success:true,message:"success"})
    }
    catch(err){
        return res.status(500).send({success:false,message:err})
    }

}



async function quantityDecrement(req,res){
    const id=req.body.id
    try{
        const data=await order.quantityDecrement(id)
        return res.status(200).send({success:true,message:"success"})
    }
    catch(err){
        return res.status(500).send({success:false,message:err})
    }

}


async function getUserData(req,res){
    const id=req.query.id
    try{
        const data=await order.getUserData(id)
        return res.status(200).send({success:true,message:"success",data:data})
    }
    catch(err){
        return res.status(500).send({success:false,message:err})
    }

}


module.exports={placeOrder,orderDetails,quantityIncrement,quantityDecrement,orderAll,getUserData,paymentMethod}