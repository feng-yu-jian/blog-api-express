const express = require('express')
const articleRouter = express.Router()
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')

const {
  addArticle
} = require('../router_handle/article.handle')

const {
  add_article_schema
} = require('../schema/article.schema')


const uploads = multer({dest: path.join(__dirname, '../uploads')})

// 发布文章的路由
articleRouter.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), addArticle)



module.exports = articleRouter