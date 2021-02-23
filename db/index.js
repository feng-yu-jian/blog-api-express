const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'a1234567890',
  database: 'blog',
})

module.exports = db
