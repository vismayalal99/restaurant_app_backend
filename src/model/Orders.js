

const makeDblib=require("../library/db");


async function getOrders(id){
    const db=makeDblib.makeDb();

    try{
       const orders = await db.query("SELECT * FROM order_details WHERE user_id=?",[id]);
       return orders
    }
    catch(err){
        return false
    }
    finally{
        await db.close()
    }

}


async function cancelOrders(id,orderId,amount){
    const db=makeDblib.makeDb();
   
    console.log(id);
    console.log(orderId);
    console.log(amount);
    try{

       const cancelOrdersDetails = await db.query("DELETE  FROM order_details WHERE id=? AND order_id=?",[id,orderId]);
      
       const order=await db.query("SELECT * FROM order_details WHERE order_id=? ",[orderId]);
       if(order.length == 0){
          const cancelOrder = await db.query("DELETE FROM orders  WHERE id =?",[orderId]);
       }
       else{
        const toatlAmount=await db.query("UPDATE orders SET total_amount = total_amount - ? WHERE id =?",[amount,orderId]);
       }
     
       return cancelOrdersDetails

    }

    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}




module.exports={getOrders,cancelOrders}