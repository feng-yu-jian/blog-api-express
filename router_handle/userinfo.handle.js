const db = require('../db/index')
const bcrypt = require('bcryptjs')


const getUserInfo = (req, res) => {
  // 定义查询用户信息的 SQL 语句
  const sql = `SELECT id, username, nickname, email, user_pic FROM users WHERE id = ?`
  // 调用 db.query() 执行 SQL 语句
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (results.length !== 1) return res.cc('获取用户信息失败！')

    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0]
    })
  })
}


const updateUserInfo = (req, res) => {
  // 定义待执行的 SQL 语句
  const sql = `UPDATE users SET ? WHERE id=?`
  // console.log(req.body) // 客户端传过来的id nickname email
  // console.log(req.body.id)
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
    // 成功
    res.cc('更新用户信息成功！', 0)
  })
}



const updatePassword = (req, res) => {
  // 根据 id 查询用户的信息
  const sql = `SELECT * FROM users WHERE id=?`
  // 执行根据 id 查询用户的信息的 SQL 语句
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 判断旧密码是否和数据库中的密码是否一致
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')

    // 定义更新密码的 SQL 语句
    const sql = `UPDATE users SET password = ? WHERE id = ?`
    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      // 成功
      res.cc('更新密码成功', 0)
    })
  })
}


const updateAvatar = (req, res) => {
  // 1. 定义更新头像的 SQL 语句
  const sql = `UPDATE users SET user_pic = ? WHERE id = ?`
  // 2. 调用 db.query() 执行 SQL 语句
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    res.cc('更换头像成功！', 0)
  })
}
 


module.exports = {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar
}