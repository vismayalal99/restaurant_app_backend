const express=require('express')
const {validateToken}=require("../middleware/auth")
const router=express.Router();
const signupRoute=require("../controllers/auth");
const imageSlider=require("../controllers/ImageSlider")


router.post('/signup',signupRoute.signup);

router.post('/login',signupRoute.login);

router.get('/getcontent',validateToken, signupRoute.getData);

router.get('/getimages',imageSlider.getImageData)

module.exports=router