const makeDblib=require("../library/db")


async function getImageData(){
    const db=makeDblib.makeDb();

    try{
        const images= await db.query("SELECT * FROM imageslider");
        console.log(images)
        return images
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}


async function addImageData(imageName){
    const db=makeDblib.makeDb();

    try{
        const image= await db.query("INSERT INTO imageslider(imageName) VALUES(?)",[imageName]);
        console.log(image)
        return image
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }

}


async function getEditImage(id){
    const db=makeDblib.makeDb();

    try{
        const image= await db.query(`SELECT * FROM imageSlider WHERE id=${id}`);
        console.log(image);
        return image
    }
    catch(err){
        console.log(err);
        return err
    }
    finally{
        await db.close()
    }
}


async function editImage(id,imagename){
      const db= makeDblib.makeDb();

     try{
        const updateImage= await db.query("UPDATE imageslider SET imageName = ? WHERE id=?",[imagename,id])
        return updateImage
     }
     catch(err){
        return err
     }
     finally{
        await db.close()
     }

}

async function deleteImage(id){
    const db=makeDblib.makeDb();

    try{
        const deleteImage= await db.query(`DELETE FROM IMAGESLIDER WHERE ID=${id}`)
        return deleteImage
    }
    catch(err){
        return err
    }
    finally{
        await db.close()
    }
}


module.exports={getImageData,addImageData,getEditImage,editImage,deleteImage}
