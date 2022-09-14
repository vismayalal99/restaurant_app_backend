const util=require('util')
const mysql = require( 'mysql' );


function makeDb(){
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:"restaurant"
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