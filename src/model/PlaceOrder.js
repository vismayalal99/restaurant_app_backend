
const makeDblib=require("../library/db");



async function placeOrder(firstName,lastName,email,phoneNo,menuItem,price,quantity){
    const db=makeDblib.makeDb();

    try{
        console.log(menuItem);
        const  customerData=await db.query("SELECT * FROM customer_data WHERE email_address = ? AND phone_no = ? ",[email,phoneNo]);
      
        if(customerData.length == 0){
            const addCustomer= await db.query("INSERT INTO customer_data(first_name,last_name,email_address,phone_no) VALUES(?,?,?,?)",
                                               [firstName,lastName,email,phoneNo]);
        }
        const customerId= await db.query("SELECT id FROM customer_data WHERE email_address=?",[email]);
        const  customer_id= customerId.map((item)=>item.id);
        const customerName= await db.query("SELECT first_name FROM customer_data WHERE email_address=?",[email]);
        const menuDetails=await db.query("SELECT id FROM menu_items WHERE name=?",[menuItem]);
        const customer_name=customerName.map((item)=>item.first_name);
        const menu_id=menuDetails.map((item)=>item.id);
        
        const order = await db.query("INSERT INTO orders (customer_id,total_amount,order_date)VALUES(?,?,?)",[customer_id,price,new Date()]);
        const orderId=await db.query("SELECT MAX(id) FROM orders");
       
        const order_id=orderId.map((item)=>item['MAX(id)'])

        console.log(order_id, customer_id,menu_id,quantity,price );
        const orderDetails= await db.query("INSERT INTO order_details(order_id,customer_name,item_name,date,quantity,amount) VALUES(?,?,?,?,?,?)",
                                            [order_id, customer_name,menuItem,new Date(),quantity,price ] )
      
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



async function orderAll(firstName,lastName,email,phoneNo,menuItems,total){
    const db=makeDblib.makeDb();

    try{
      
        const  customerData=await db.query("SELECT * FROM customer_data WHERE email_address = ? AND phone_no = ? ",[email,phoneNo]);
      
        if(customerData.length == 0){
            const addCustomer= await db.query("INSERT INTO customer_data(first_name,last_name,email_address,phone_no) VALUES(?,?,?,?)",
                                                 [firstName,lastName,email,phoneNo])
        }
        const customerId= await db.query("SELECT id FROM customer_data WHERE email_address=?",[email]);
        const customer_id=customerId.map((item)=>item.id);
        const customerName= await db.query("SELECT first_name FROM customer_data WHERE email_address=?",[email]);
        const customer_name=customerName.map((item)=>item.first_name);
        const order = await db.query("INSERT INTO orders (customer_id,total_amount,order_date)VALUES(?,?,?)",[customer_id,total,new Date()]);
       
        const orderId=await db.query("SELECT MAX(id) FROM orders");
       
        const order_id=orderId.map((item)=>item['MAX(id)']);
        const orderDetails= await db.query("INSERT INTO order_details(order_id,customer_name,item_name,date,quantity,amount) VALUES ?",
                            [menuItems.map(item => [order_id,customer_name, item.name,new Date(),item.quantity,item.price])]);
        
        return customerData
    }
    catch(err){
      
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
        const quantity=await db.query("UPDATE cart SET quantity=quantity+1 WHERE quantity <10 &&  id=?",[id]);
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
        const quantity=await db.query("UPDATE cart SET quantity = quantity - 1 WHERE quantity > 0 && id=?",[id]);
        return quantity
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}

module.exports={placeOrder,orderDetails,quantityincrement,quantityDecrement,orderAll}