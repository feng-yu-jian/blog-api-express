const db = require('../db/index')


const getArticleCates = (req, res) => {
  // 定义查询分类列表数据的 SQL 语句
  const sql = `SELECT * FROM article_cate WHERE is_delete = 0 ORDER BY id ASC`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results
    })
  })
}


const addArticleCates = (req, res) => {
  // 1. 定义查重的 SQL 语句
  const sql = `SELECT * FROM article_cate WHERE name=? OR alias = ?`
  // 2. 执行查重的 SQL 语句
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 3. 判断是否执行 SQL 语句失败
    if (err) return res.cc(err)

    // 4.1 判断数据的 length
    if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    // 4.2 length 等于 1 的三种情况
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    // 定义插入文章分类的 SQL 语句
    const sql = `INSERT INTO article_cate SET ?`
    // console.log(req.body) // { name: '文化', alias: 'WenHua' }
    // 执行插入文章分类的 SQL 语句
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 0)
    })
  })
}


const deleteCateById = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `UPDATE article_cate SET is_delete =1 WHERE id = ?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  })
}

const getArticleCateById = (req, res) => {
  // 定义根据 ID 获取文章分类数据的 SQL 语句
  const sql = `SELECT * FROM article_cate WHERE id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0]
    })
  })
}

const updateCateById = (req, res) => {
  // 定义查重的 SQL 语句
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句  <> 不等于
  const sql = `SELECT * FROM article_cate WHERE Id<>? AND (name = ? or alias = ?)`
  // 调用 db.query() 执行查重的 SQL 语句
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 判断名称和别名被占用的4种情况
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    // 定义更新文章分类的 SQL 语句
    const sql = `UPDATE article_cate SET ? WHERE Id = ?`
    // 执行更新文章分类的 SQL 语句
    // console.log(req.body)
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}


module.exports = {
  getArticleCates,
  addArticleCates,
  deleteCateById,
  getArticleCateById,
  updateCateById
}