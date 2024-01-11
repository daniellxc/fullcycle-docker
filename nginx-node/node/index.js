const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const conn = mysql.createConnection(config)

//const sql = `INSERT INTO people(name) values('Daniel') `
//conn.query(sql)


app.get('/', (req, res) => {
  const listQuery = 'SELECT name FROM people'
  conn.query(listQuery, (err, result) => {
    if(err){
      console.error('erro on execute query:', err)
      res.status(500)
    }
    let htmlResp = '<h1>Full Cycle Rocks! </h1><ul>'
    
    result.forEach(n => {
      htmlResp += `<li>${n.name} </li>`
    });

    htmlResp += `</ul>`

    res.send(htmlResp)
    
  } )
})

app.post('/:name', (req, res) => {
  const listQuery = 'INSERT INTO people(name) values(?)'
  const name = req.params.name

  conn.query(listQuery,[name], (err, result) => {
    if(err){
      console.error('erro on execute query:', err)
      res.status(500)
    }
    res.status(201).send('people added with success')
  } )
})



app.listen(port, () => {
  console.log('App running on port ' + port)
})



