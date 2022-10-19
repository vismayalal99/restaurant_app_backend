const imageSlider=require("../model/imageSlider")


async function getImageData(req, res) {

    try {
         const data=  await imageSlider.getImageData()
         return res.status(200).send({ success:true,message:"Success",data:data })   
    } 
  
    catch (err) {
      return res.status(500).send({ success:false,message:"Error found" });
    }
  }



  async function uploadImage(req,res){
   
    try{
     
        const data =await imageSlider.addImageData(req.file.originalname)
        return res.status(200).send({success:true,message:"Successfully Uploaded"})

    }
    catch(err){
      return res.status(500).send({success:false,message:"Not Uploaded"})
    }
  }


  async function getEditImage(req,res){
   
        const id=req.query.id
        console.log(id);
        try{
          const data= await imageSlider.getEditImage(id)
          return res.status(200).send({success:true,message:"success",data:data})
        }
        catch(err){
          return res.status(500).send({success:false,message:err})
        }
        
  }



  async function editImage(req,res){
     
    try{
       const data= await imageSlider.editImage(req.query.id,req.file.originalname)
       console.log(data);
       return res.status(200).send({success:true,message:"Successfully Updated"})

    }
    catch(err){
      return res.status(500).send({success:false,message:"Please Upload the Image"})
    }

  }



  
  async function deleteImage(req,res){
    try{
      await imageSlider.deleteImage(req.query.id)
      return res.status(200).send({success:true,message:"SuccessFully Deleted"})
    }

    catch(err){
      console.log(err);
        return res.status(500).send({success:false,message:err})
    }

  }

  module.exports={getImageData,uploadImage,getEditImage,editImage,deleteImage}