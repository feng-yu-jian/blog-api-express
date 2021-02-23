const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const register = (req, res) => {
  const userInfo = req.body
  //定义sql语句，查询用户名是否被占用
  const sqlStr = 'SELECT * FROM users WHERE username = ?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.cc('用户名被占用，请更换其他用户名')
    }
    //加密密码
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    const sql = 'INSERT INTO users SET ?'
    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.cc(err)
      // 判断影响行数是否为 1
      if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请重新注册' })
      // res.send({status: 0, message: '注册成功'})
      res.cc('注册成功', 0)
    })
  })
}




const login = (req, res) => {
  const userInfo = req.body
  // console.log(userInfo)
  const sqlStr = 'SELECT * FROM users WHERE username = ?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) return res.cc(err)
    // 查询是否有这个用户
    if (results.length !== 1) return res.cc('登录失败')
    // console.log(results)
    // 判断用户输入的密码是否正确
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    // console.log(compareResult)  // true/false
    if (!compareResult) return res.cc('密码错误')

    // 在服务器端生成 JWT 的 Token 字符串，在生成 Token 字符串的时候，一定要剔除 **密码** 和 **头像** 的值
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: '', user_pic: '' }
    // 对用户的信息进行加密，生成 Token 字符串   npm i jsonwebtoken@8.5.1
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  })
}




module.exports = {
  register,
  login
}