const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const router = require('./routes')
const bodyParser = require('koa-bodyparser')  // 用来解析请求体

// 解析请求体
app.use(bodyParser())
app.use(router.routes())



app.listen(config.port, () => {
  console.log(`server is start ${config.port}`)
})
