const multer=require('multer')


const fileDiskStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"uploads/Contents")
    },
    filename:(req,file,cb)=>{
      //  console.log(file);
      console.log(file);
        cb(null,file.originalname)
    },
});


const upload=multer({storage:fileDiskStorage});

module.exports={upload}