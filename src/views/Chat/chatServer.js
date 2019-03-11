const app = require('http').createServer()
const io = require('socket.io')(app)

// 定义用户数组
let users = []
app.listen(8080) // 监听8080端口

io.on('connection', function(socket) {
  // 是否是新用户标识
  let isNewPerson = true
  // 当前登录用户
  let username = null
  // 监听登录
  socket.on('login', function(data) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === data.username) {
        isNewPerson = false
        break
      } else {
        isNewPerson = true
      }
    }
    console.log(username)
    if (isNewPerson) {
      username = data.username
      users.push({
        username: data.username
      })
      // 登录成功
      socket.emit('loginSuccess', data)
      // 向所有连接的客户端广播add事件
      io.sockets.emit('add', data)
    } else {
      // 登录失败
      socket.emit('loginFail', '登录失败')
    }
  })

  // 监听发送消息
  socket.on('sendMessage', function(data) {
    io.sockets.emit('receiveMessage', data)
  })

  // 退出登录
  socket.on('disconnect', function() {
    // 向所有连接的客户端广播leave事件
    io.sockets.emit('leave', username)
    users.map(function(val, index) {
      if (val.username === username) {
        users.splice(index, 1)
      }
    })
  })
})

console.log('app listen to 8080')
