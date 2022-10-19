
const makeDblib=require("../library/db");



async function placeOrder(firstName,lastName,email,phoneNo,menuItem,price,quantity,section){
    const db=makeDblib.makeDb();

    try{
       
        const  customerData=await db.query("SELECT * FROM customer_data WHERE email_address = ? AND phone_no = ? ",[email,phoneNo]);
      
        if(customerData.length == 0){
            const addCustomer= await db.query("INSERT INTO customer_data(first_name,last_name,email_address,phone_no) VALUES(?,?,?,?)",
                                               [firstName,lastName,email,phoneNo]);
        }
        const customerDetails= await db.query("SELECT id,first_name FROM customer_data WHERE email_address=?",[email]);
        const  customer_id= customerDetails[0].id
        const customer_name=customerDetails[0].first_name
        const order = await db.query("INSERT INTO orders (customer_id,total_amount)VALUES(?,?)",[customer_id,price]);
        
        if(section =="buyNowItems"){
         
            const orderDetails= await db.query("INSERT INTO order_details(order_id,customer_name,item_name,quantity,amount) VALUES(?,?,?,?,?)",
                                                [order.insertId, customer_name,menuItem,quantity,price ] )
        }
        else{
          
            const orderDetails= await db.query("INSERT INTO order_details(order_id,customer_name,item_name,quantity,amount) VALUES ?",
            [menuItem.map(item => [order.insertId,customer_name, item.name,item.quantity,item.price])]);

        }

        return customerData
    }
    catch(err){
        console.log(err);
        return false
    }

    finally{
         await db.close()
    }
}




async function orderDetails(){
    const db=makeDblib.makeDb();

    try{
        const order_details=await db.query("SELECT * FROM order_details");
        return order_details
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}



async function quantityincrement(id){
    const db=makeDblib.makeDb();

    try{
        const quantity=await db.query("UPDATE cart SET quantity=quantity+1 WHERE quantity <10 AND  id=?",[id]);
        return quantity
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}



async function getUserData(id){
    const db=makeDblib.makeDb();

    try{
        const quantity=await db.query("SELECT * FROM signup_user WHERE id=? ",[id]);
        return quantity
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}



async function quantityDecrement(id){
    const db=makeDblib.makeDb();

    try{
        const quantity=await db.query("UPDATE cart SET quantity = quantity - 1 WHERE quantity > 0 AND id=?",[id]);
        return quantity
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}

module.exports={placeOrder,orderDetails,quantityincrement,quantityDecrement,getUserData}