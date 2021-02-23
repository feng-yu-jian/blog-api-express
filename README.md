# express-api

使用 `npm install` 来下载第三方包

使用 `npm start` 来启动项目，默认监听3008端口

下面列出一些express接口项目中使用的第三方包

## 1. 注册

1. 配置 cors **跨域**和解析表单数据的中间件

   ```
   npm i cors
   ```

   ```
   app.use(express.urlencoded({ extended: false }))
   ```

2. 注册时对密码进行**加密**处理

   ``` 
   npm i bcryptjs
   ```

3. 为表单中携带的每个数据项，**定义验证规则**

   ``` 
   npm install @hapi/joi
   ```



## 2. 登录

1. 生成 **JWT** 的 Token 字符串

   ``` 
   npm i jsonwebtoken
   ```

2. 配置**解析 Token** 的中间件

   ``` 
   npm i express-jwt
   ```



## 3. 个人中心



## 4.文章分类管理

使用 multer 解析表单数据

```
npm i multer
```
