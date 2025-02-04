// 服务器人口文件
// 1.创建 koa 实例对象
const Koa = require('koa')
const app = new Koa()
const http = require('http')

// 2.绑定中间件
// 绑定第一层中间件
const respDurationMiddleware = require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
// 绑定第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
// 绑定第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)

// 创建HTTP服务器
const server = http.createServer(app.callback())
// 绑定WebSocket服务
const webSocketService = require('./service/web_socket_service')
// 开启服务端监听，监听客户端的连接
// 当某个客户端连接成功之后，就会对这个客户端进行 message 事件的监听
webSocketService.listen(server)
// 3.绑定端口号，监听Glitch提供的端口
server.listen(process.env.PORT, () => {
  console.log(`服务器启动成功 http://127.0.0.1:${process.env.PORT}`)
})
