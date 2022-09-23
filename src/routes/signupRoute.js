const express=require('express')
const {validateToken}=require("../middleware/auth")
const router=express.Router();
const signupRoute=require("../controllers/auth");
const imageSlider=require("../controllers/ImageSlider");
const images=require("../middleware/ImageSlider")


router.post('/signup',signupRoute.signup);

router.post('/login',signupRoute.login);

router.get('/getcontent',validateToken, signupRoute.getData);

router.get('/getimages',imageSlider.getImageData);

router.post('/uploadimage',images.upload.single('img'), imageSlider.uploadImage);

router.get('/getimages/edit',imageSlider.getEditImage);

router.patch('/images/edit',images.upload.single('img'), imageSlider.editImage)

module.exports=router