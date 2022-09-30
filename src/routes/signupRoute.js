const express=require('express')
const {validateToken}=require("../middleware/auth")
const router=express.Router();
const authRoute=require("../controllers/auth");
const imageSlider=require("../controllers/ImageSlider");
const images=require("../middleware/ImageSlider")


router.post('/signup',authRoute.signup);

router.post('/login',authRoute.login);

router.get('/getcontent',validateToken, authRoute.getData);

router.get('/getimages',imageSlider.getImageData);

router.post('/uploadimage',images.upload.single('img'), imageSlider.uploadImage);

router.get('/getimages/edit',imageSlider.getEditImage);

router.patch('/images/edit',images.upload.single('img'), imageSlider.editImage);

router.delete('/images/delete',imageSlider.deleteImage)

module.exports=router