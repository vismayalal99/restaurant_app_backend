const multer=require('multer')


const fileDiskStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"uploads/Contents")
    },
    filename:(req,file,cb)=>{
      console.log(file);
        cb(null,file.fieldname + '-' + Date.now() )
    },
});


const upload=multer({storage:fileDiskStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image file'))
     }
   cb(undefined, true)
}
});

module.exports={upload}