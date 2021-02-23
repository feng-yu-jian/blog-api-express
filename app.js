const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('@hapi/joi')
const config = require('./config')
const expressJWT = require('express-jwt')

//  配置 cors 跨域
app.use(cors())
// 配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({extended: false}))


// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 一定要在路由之前 配置解析 Token 的中间件  /api开头的都不需要身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 用户路由模块
const userRouter = require('./router/user.router')
app.use('/api', userRouter)

// 用户信息
const userInfoRouter = require('./router/userInfo.router')
app.use('/my', userInfoRouter)

// 文章分类
const articleCateRouter = require('./router/articleCate.router')
app.use('/my/article', articleCateRouter)


// 文章路由模块
const articleRouter = require('./router/article.router')
app.use('/my/article', articleRouter)




// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误信息
  if (err instanceof joi.ValidationError) return res.cc(err)
  // token身份认证失败后的错误信息
  // console.log(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

app.listen(3008, function() {
  console.log('api server running at http://127.0.0.1:3008')
})