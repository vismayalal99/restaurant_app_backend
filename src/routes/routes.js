const express=require('express')
const {validateToken}=require("../middleware/auth")
const router=express.Router();
const authRoute=require("../controllers/auth");
const imageSlider=require("../controllers/imageSlider");
const images=require("../middleware/imageSlider");
const menuItems=require("../controllers/foodMenu");
const order=require("../controllers/placeOrder")


// ------------ Authentication -------

router.post('/signup',authRoute.signup);

router.post('/login',authRoute.login);

router.get('/getcontent',validateToken, authRoute.getData);



//   ---------- Image Slider ------------

router.get('/getimages',imageSlider.getImageData);

router.post('/uploadimage',images.upload.single('img'), imageSlider.uploadImage);

router.get('/getimages/edit',imageSlider.getEditImage);

router.patch('/images/edit',images.upload.single('img'), imageSlider.editImage);

router.delete('/images/delete',imageSlider.deleteImage);

// ---------- MENU & CART --------------



router.get('/mainmenu',menuItems.mainMenu);

router.post('/cart',menuItems.addToCart);

router.get('/getcart',menuItems.getCartData);

router.delete('/deletecart',menuItems.deleteCartData);

router.delete('/deletecartall',menuItems.deleteCartDataAll);


router.get('/getmenuitems',menuItems.menu_items);

router.get('/getcategory',menuItems.menuCategory);

router.post('/addmenuitems',images.upload.single('img'), menuItems.addMenuItems);

router.get('/geteditmenudata',menuItems.getEditMenu);

router.patch('/editmenu',images.upload.single('img'), menuItems.editMenu);

router.delete('/deletemenuitem',menuItems.deleteMenu)


//------- ORDER ----------------

router.post('/placeorder',order.placeOrder);

router.get('/getpaymentmethod',order.paymentMethod)

router.get('/orderDetails',order.orderDetails);

router.patch('/cart/quantityincrement',order.quantityIncrement)

router.patch('/cart/quantitydecrement',order.quantityDecrement);

router.post('/orderall',order.orderAll);

router.get('/getuserdata',order.getUserData)

module.exports=router
