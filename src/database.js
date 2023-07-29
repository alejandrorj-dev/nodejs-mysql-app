const mysql = require('mysql2');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }

        console.error('Connection error: ', err);
    }

    if (connection) {
        connection.release();
        console.log('Database is connected!');
        return;
    }

});

// Promisify pool query, for convert callbacks into promises
pool.query = promisify(pool.query);

module.exports = pool;