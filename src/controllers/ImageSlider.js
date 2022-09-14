const imageSlider=require("../model/ImageSlider")


async function getImageData(req, res) {

    try {
         const data=  await imageSlider.getImageData()
         return res.status(200).send({success:true,message:"Success",data:data})
        
    } 
  
    catch (err) {
      return res.status(500).json({ success:false,message:"Error found" });
    }
  }

  module.exports={getImageData}