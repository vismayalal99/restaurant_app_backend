
const makeDblib=require("../library/db");


async function getMainMenuItems(){
    const db=makeDblib.makeDb();

    try{

        const menuItem= await db.query("SELECT * FROM menu_items WHERE category_id=1");
        return menuItem
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}

async function getStartersMenuItems(){
    const db=makeDblib.makeDb();

    try{
        const menuItem= await db.query("SELECT * FROM menu_items WHERE category_id=2");
        return menuItem
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}


async function addToCart(user_id,menu_id,image,name,price,quantity,availability){
    console.log(user_id);
    const db=makeDblib.makeDb();

    try{
        const menuItem= await db.query("INSERT INTO cart(user_id,menu_id,image,name,price,quantity,availability) VALUES(?,?,?,?,?,?,?)",[user_id,menu_id,image,name,price,quantity,availability]);
        console.log(menuItem)
        return menuItem
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}



async function getCartData(id){
    const db=makeDblib.makeDb();
    try{
        const menuItem=await db.query("SELECT * FROM cart WHERE user_id=?",[id]);
        return menuItem
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}


async function deleteCartData(id){
    const db=makeDblib.makeDb();
    try{
        const menuItem=await db.query(`DELETE FROM cart WHERE id=${id}`);
        return menuItem
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}


async function deleteCartDataAll(id){
    const db=makeDblib.makeDb();
    try{
        const menuItem=await db.query(`DELETE FROM cart WHERE user_id=${id}`);
        return menuItem
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}


async function getmenuitems(){
    const db=makeDblib.makeDb();
    try{
        const menuItems= await db.query("SELECT categories.id as c_id, categories.ctgy_name,menu_items.id,menu_items.name,menu_items.price,menu_items.availability,menu_items.image FROM categories RIGHT JOIN menu_items  ON categories.id = menu_items.category_id;  ")
        return menuItems
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}


async function getCategory(){
    const db=makeDblib.makeDb();
    try{
        const categories= await db.query("SELECT * FROM categories ")
        return categories
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }
}



async function addMenuItems(image,menuItem,price,category){
    const db=makeDblib.makeDb();
    const avail=1
    try{
        const menu_items= await db.query("INSERT INTO menu_items(category_id,name,price,availability,image) VALUES(?,?,?,?,?)",[category,menuItem,price,avail,image])
        return menu_items
    }
    catch(err){
        console.log(err);
        return false
    }
    finally{
        await db.close()
    }
}



async function getEditMenu(id){
    const db=makeDblib.makeDb();
    try{
        const menuItem=await db.query("SELECT * FROM menu_items WHERE id=?",[id]);
        console.log(menuItem);
        return menuItem
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}


async function editMenu(id,image,menuItem,price,category,avail){
    const db=makeDblib.makeDb();
    try{

        const menuItems=await db.query("UPDATE menu_items SET category_id = ?, name=?, price=?, availability=?, image=COALESCE(?,image) WHERE id=?",[category,menuItem,price,avail,image,id]);
        const cartItem=await db.query("UPDATE cart SET name=?, price=?, availability=?, image=COALESCE(?,image) WHERE menu_id=?",[menuItem,price,avail,image,id]);
        console.log(menuItems);
  
        return true
    }
    catch(err){
        return false
    }
    finally{
        await db.close()
    }

}


async function deleteMenuitem(id){
    const db=makeDblib.makeDb();
    try{
        const menuItem=await db.query(`DELETE FROM menu_items WHERE id=${id}`);
        return menuItem
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }

}



module.exports={getMainMenuItems,getStartersMenuItems,
                addToCart,getCartData,deleteCartData,
                deleteCartDataAll,getmenuitems,
                getCategory,addMenuItems,getEditMenu,editMenu,deleteMenuitem
            }