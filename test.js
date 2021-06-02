const { Client } = require('pg');
const express = require('express');
const cors = require('cors')
const app = express();
const DBFunctions = require('./Functions/DBFunctions.js')
var client = null

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.send("Empty (But working) Web Page")
});

app.post('/connect', (req, res) => {
    console.log("connect -> " + req.body.dbName)
    client = new Client({
        user: 'ron',
        host: '172.30.92.221',//req.body.ip,
        database: 'demodb',//req.body.dbName,
        password: 'Bsmch@500K!',
        port: 5432
    });
    res.header( "Access-Control-Allow-Origin" );
    res.send(true)
})

app.get('/create', (req, res) => {
    //console.log("create -> " + req.body.dbName)
    //DBFunctions.createTable(client, req.body.tableName, req.body.cols)
    client = new Client({
        user: 'ron',
        host: '172.30.92.221',//req.body.ip,
        database: 'demodb',//req.body.dbName,
        password: 'Bsmch@500K!',
        port: 5432
    });
    DBFunctions.createTable(client, "", "")
    res.header( "Access-Control-Allow-Origin" );
    res.send("Table created Successfully")
})

app.post('/tables', async (req, res) => {
    client = new Client({
        user: 'ron',
        host: '172.30.92.221',//req.body.ip,
        database: 'demodb',//req.body.dbName,
        password: 'Bsmch@500K!',
        port: 5432
    });
    //let result = await DBFunctions.getTablesNames(client)
    const query = `select * from public.users`
    await client.connect((err) => console.log(err))
    await client.query(query, (err, result) => {
        if(err) {
            console.log("ERROR -> " + err);
            return "ERROR"
        }
        else {
          /*  client.end()
            console.log("JORDI")
            console.log(res)
            console.log(res.rows) */
          console.log(result)
          res.send(result.rows)
        }
    })
  
})

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
