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

module.exports={getImageData}
