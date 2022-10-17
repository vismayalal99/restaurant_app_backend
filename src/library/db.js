const util=require('util')
const mysql = require( 'mysql' );
require('dotenv').config()


function makeDb(){
    const connection = mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        
});


return{
    query(sql,args){
        return util.promisify(connection.query).call(connection,sql,args);
    },
    close(){
        return util.promisify(connection.end).call(connection)
    }
};
}

module.exports={ makeDb }