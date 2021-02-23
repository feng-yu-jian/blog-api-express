const express = require('express')
const articleCateRouter = express.Router()
const expressJoi = require('@escook/express-joi')


const {
  getArticleCates,
  addArticleCates,
  deleteCateById,
  getArticleCateById,
  updateCateById
} = require('../router_handle/articlecate.handle')


const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema
} = require('../schema/articleCate.schema')


// 获取文章分类列表
articleCateRouter.get('/cates', getArticleCates)

// 新增文章分类
articleCateRouter.post('/addcates', expressJoi(add_cate_schema), addArticleCates)

// 根据 Id 删除文章分类
articleCateRouter.get('/deletecate/:id', expressJoi(delete_cate_schema), deleteCateById)

// 根据 Id 获取文章分类
articleCateRouter.get('/cates/:id', expressJoi(get_cate_schema), getArticleCateById)

// 根据 Id 更新文章分类
articleCateRouter.post('/updatecate', expressJoi(update_cate_schema), updateCateById)


module.exports = articleCateRouter
