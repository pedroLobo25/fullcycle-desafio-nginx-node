const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
let rows = 0;
const mariadb = require('mariadb');
const pool = mariadb.createPool(config);

const sql = `INSERT INTO people(name) values('Pedro')`
let html = `<h1>Full Cycle Rocks!</h1>`;
//const mysql = require('mysql')
//const connection = mysql.createConnection(config)

async function asyncFunction() {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(sql);
        rows = await conn.query(`Select name FROM people`);
        rows.forEach(element => {
            html = html + `${element.name},`;
        });
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  asyncFunction();

//const connection = await pool.getConnection();
//connection.query(sql)
//connection.end()


app.get('/', (req,res) => {
    res.send(html);
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})