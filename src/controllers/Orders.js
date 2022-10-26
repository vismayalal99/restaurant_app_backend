
const orderData=require("../model/Orders")

async function getOrders(req,res){
    const id=req.query.id
    try{

        const data=await orderData.getOrders(id)
        return res.status(200).send({success:true,message:"Success",data:data})
    }

    catch(err){
        return res.status(500).json({ success:false,message:"Error found" });
    }
}


async function cancelOrders(req,res){
    const id=req.body.id
    const orderId=req.body.orderId;
    const amount=req.body.amount;
  
    try{

        const data=await orderData.cancelOrders(id,orderId,amount)
        return res.status(200).send({success:true,message:"Order Canceled"})
    }

    catch(err){
        return res.status(500).json({ success:false,message:"Error found" });
    }
}







module.exports={getOrders,cancelOrders}