const express = require('express')
const userRouter = express.Router()
// 验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

const {
  register,
  login
} = require('../router_handle/user.handle')
// 导入需要的验证规则对象
const {
  reg_login_schema
} = require('../schema/user.schema')


// 注册新用户
// 0 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
userRouter.post('/register', expressJoi(reg_login_schema), register)

// 登录路由
userRouter.post('/login', expressJoi(reg_login_schema), login)



module.exports = userRouter