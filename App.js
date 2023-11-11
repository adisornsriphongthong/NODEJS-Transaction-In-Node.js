const express = require('express');
const mysql = require('mysql2/promise'); // Use the promise version

const app = express();

async function main() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'myproduct',
        charset: 'utf8mb4'
    });

    await connection.connect((err) => {
        if(err) throw err;
        console.log('Connected to database');

    })

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Perform operations within the transaction
        await updateProductQuantity(connection, 1);

        // Commit the transaction
        await connection.commit();

        console.log('Transaction committed successfully!');
    } catch (error) {
        // If an error occurs, roll back the transaction
        await connection.rollback();
        console.error('Transaction rolled back:', error);
    } finally {
        // Release the connection back to the pool
        connection.end();
    }
}

async function updateProductQuantity(connection, orderedQuantity) {
    const sql = 'UPDATE products SET quantity = quantity - 1 WHERE Id = 1';
    await connection.execute(sql);
}



main().catch((err) => {
    console.error('Error:', err);
});

console.log('Hello World');
