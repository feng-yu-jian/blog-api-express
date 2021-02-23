const joi = require('@hapi/joi')

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
// allow允许为空
const content = joi.string().required().allow('')
// valid表示为允许的合法值
const state = joi.string().valid('已发布', '草稿').required()


// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}
