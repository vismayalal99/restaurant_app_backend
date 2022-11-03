const menu_item=require("../model/foodMenu")
const img=require("../middleware/imageSlider")



 async function mainMenu(req,res){
    console.log("test");
    try{
      const data=await menu_item.getMainMenuItems()
      return res.status(200).send({success:true,message:"Success",data:data})
    }

    catch(err){
      console.log(err);
        return res.status(500).send({success:false,message:err})
    }

  }





  async function addToCart(req,res){

     const quantity=req.body.quantity;
     const menu_id=req.body.data.id;
     const user_id=req.body.id
    
    try{
      const data=await menu_item.addToCart(user_id,menu_id,quantity)
      return res.status(200).send({success:true,message:"Item added to Cart"})
    }

    catch(err){
      console.log(err);
        return res.status(500).send({success:false,message:err})
    }
  }





  async function getCartData(req,res){
   const user_id=req.query.id
   console.log(user_id);
    try{
      const data= await menu_item.getCartData(user_id)
      return res.status(200).send({success:true,message:"Success",data:data})
    }
    catch(err){
      console.log(err);
        return res.status(500).send({success:false,message:err})
    }
  }



  
  async function deleteCartData(req,res){
     const id =req.query.id
     
    try{
      const data= await menu_item.deleteCartData(id)
      return res.status(200).send({success:true,message:"Cart Item deleted",data:data})
    }
    catch(err){
      console.log(err);
        return res.status(500).send({success:false,message:err})
    }
  }


  


  async function deleteCartDataAll(req,res){
    const id =req.query.id
    
   try{
     const data= await menu_item.deleteCartDataAll(id)
     return res.status(200).send({success:true,message:"Success",data:data})
   }
   catch(err){
     console.log(err);
       return res.status(500).send({success:false,message:err})
   }
 }


 async function menu_items(req,res){

     try{
      const data= await menu_item.getmenuitems()
      return res.status(200).send({success:true,message:"Success",data:data})
     }
     catch(err){
      return res.status(500).send({success:false,message:err})
     }

 }


 async function menuCategory(req,res){

  try{
   const data= await menu_item.getCategory()
   return res.status(200).send({success:true,message:"Success",data:data})
  }
  catch(err){
   return res.status(500).send({success:false,message:err})
  }

}



async function addMenuItems(req,res){

  try{
    const image=req.file.filename;
    const menuItem =req.body.menuItem;
    const price =req.body.price;
    const category=req.body.category;
    const quantity=req.body.quantity
    
    console.log(image,menuItem,price,category,quantity);
    
    if(image!="" && menuItem !="" && price !="" && category !=""){
      
    const data= await menu_item.addMenuItems(image,menuItem,price,category,quantity);
    return res.status(200).send({success:true,message:"MenuItem Uploaded succesfully",data:data})
    
  }

    if(!image){
      return res.status(500).send({success:false,message:"Please Upload the image"})
    }
  
  }
   catch(err){
    return res.status(500).send({success:false,message:"Enter valid inputs"})
   }

}


async function getEditMenu(req,res){
  const id =req.query.id
  console.log(id);
 try{
   const data= await menu_item.getEditMenu(id)
   return res.status(200).send({success:true,message:"Success",data:data})
 }
 catch(err){
   console.log(err);
     return res.status(500).send({success:false,message:err})
 }
}


async function editMenu(req,res){
  const id =req.query.id
  const menuItem =req.body.menuItem;
  const price =req.body.price;
  const category=req.body.category;
  const avail=req.body.avail;
  const quantity=req.body.quantity;
  console.log("quan",quantity);
  let img;
   
  if(!req.file){
     img=null
  }
  else{
    img = req.file.filename
  }

 try{
    const data= await menu_item.editMenu(id,img,menuItem,price,category,avail,quantity)
    return res.status(200).send({success:true,message:"MenuItem Updated Successfully"})
 
 }
 catch(err){
 
     return res.status(500).send({success:false,message:err});
 }
}



async function deleteMenu(req,res){ 
  const id =req.query.id

  try{
    const data= await menu_item.deleteMenuitem(id)
    return res.status(200).send({success:true,message:"MenuItem Deleted Successfully"})
  }
  catch(err){
    console.log(err);
      return res.status(500).send({success:false,message:err})
  }

}


module.exports={mainMenu,addToCart,getCartData,deleteCartData,
                deleteCartDataAll,menu_items,menuCategory,addMenuItems,getEditMenu,editMenu,deleteMenu
              }