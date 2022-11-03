const express=require('express')
const {validateToken}=require("../middleware/auth")
const router=express.Router();
const authRoute=require("../controllers/auth");
const imageSlider=require("../controllers/imageSlider");
const images=require("../middleware/imageSlider");
const menuItems=require("../controllers/foodMenu");
const order=require("../controllers/placeOrder");
const ordersData=require("../controllers/Orders");




function uploadImage(req,res,next){

    const uploadSingleImage=images.upload.single('img');
    
   
    uploadSingleImage(req,res,function (err){
        console.log("check",req.file.filename);
        if(err){
            return res.status(401).send({message:err.message})
        }
        else{
        return next()
        }
    })

}




// ------------ Authentication -------

router.post('/signup',authRoute.signup);

router.post('/login',authRoute.login);

router.get('/getcontent',validateToken, authRoute.getData);



//   ---------- Image Slider ------------

router.get('/getimages',imageSlider.getImageData);

router.post('/uploadimage', uploadImage , imageSlider.uploadImage);

router.get('/getimages/edit',imageSlider.getEditImage);

router.patch('/images/edit',uploadImage, imageSlider.editImage);

router.delete('/images/delete',imageSlider.deleteImage);

// ---------- MENU & CART --------------



router.get('/mainmenu',menuItems.mainMenu);

router.post('/cart',menuItems.addToCart);

router.get('/getcart',menuItems.getCartData);

router.delete('/deletecart',validateToken, menuItems.deleteCartData);

router.delete('/deletecartall',menuItems.deleteCartDataAll);


router.get('/getmenuitems',menuItems.menu_items);

router.get('/getcategory',menuItems.menuCategory);

router.post('/addmenuitems',uploadImage, menuItems.addMenuItems);

router.get('/geteditmenudata',menuItems.getEditMenu);

router.patch('/editmenu',uploadImage, menuItems.editMenu);

router.delete('/deletemenuitem',menuItems.deleteMenu)


//------- ORDER ----------------

router.post('/placeorder',validateToken, order.placeOrder);

router.get('/getpaymentmethod',order.paymentMethod)

router.get('/orderDetails',order.orderDetails);

router.patch('/cart/quantityincrement',order.quantityIncrement)

router.patch('/cart/quantitydecrement',order.quantityDecrement);

router.post('/orderall',validateToken, order.orderAll);

router.get('/getuserdata',order.getUserData);

router.get('/orders',ordersData.getOrders);

router.delete('/orders',validateToken, ordersData.cancelOrders)






module.exports=router
