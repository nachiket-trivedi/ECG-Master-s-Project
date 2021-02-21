var mysql = require('promise-mysql');

var dbConfig = {
    connectionLimit: 20,
    host: 'ecg-database-1.cba9kabwgk3a.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'ecgAdminPassword',
    database: 'ecgdb',
    port: 3306,
    debug: false,
    multipleStatements: true
}

module.exports = async () => {
    var pool = await mysql.createPool(dbConfig)
    return new Promise(async (resolve, reject) => {
        pool.getConnection().then(function (con) {
            if (con) {
                console.log("Connection to DB Successful");
                resolve(con)
            }
        }).catch(function (err) {
            console.log("error " + err)
            reject(err)
        });
    })
}