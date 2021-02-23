// 这是一个全局的配置文件

module.exports = {
  // 并向外共享 **加密** 和 **还原** Token 的 `jwtSecretKey` 字符串
  jwtSecretKey: 'jiayou^_^',
  // token 的有效期
  expiresIn: '10h',
}
