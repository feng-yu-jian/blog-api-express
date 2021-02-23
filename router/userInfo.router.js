const express = require('express')
const userInfoRouter = express.Router()
const expressJoi = require('@escook/express-joi')

const {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar
} = require('../router_handle/userinfo.handle')

const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema
} = require('../schema/userInfo.schema')



// 获取用户基本信息
userInfoRouter.get('/userinfo', getUserInfo)

// 更新用户信息
userInfoRouter.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 更新密码
userInfoRouter.post('/updatepwd', expressJoi(update_password_schema), updatePassword)

// 更换头像
userInfoRouter.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)



module.exports = userInfoRouter