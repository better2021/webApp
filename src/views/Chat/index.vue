<template>
  <div id="chat">
    <div class="loginBox" v-show="show">
      <div class="login">
        <h3>用户登录</h3>
        <input type="text" class="text" v-model="name" placeholder="请输入您的昵称">
        <br>
        <input type="button" class="btn" value="登录" @click="login">
      </div>
    </div>

    <div class="chatBox" v-show="!show">
      <div class="chatHead">多人聊天室</div>
      <div id="chat-con"></div>
      <div class="chatFoot">
        <input type="text" class="txt" v-model="txt">
        <input type="button" class="send" value="发送" @click="sendMessage">
      </div>
    </div>

    <Loading v-show="loading"></Loading>
    <Menu></Menu>
  </div>
</template>

<script>
import io from 'socket.io-client' // 引入客户端的socket
import Menu from '../../components/Menu'
export default {
  components: {
    Menu
  },
  data() {
    return {
      loading: false,
      show: true,
      socket: io('ws://localhost:8080'), // 建立socket连接，使用websocket协议，端口号是服务器监听的端口号
      name: '', // 定义用户名
      txt: '' // 发送的信息
    }
  },
  mounted() {
    let chatView = document.getElementById('chat-con')
    // 登录成功
    this.socket.on('loginSuccess', data => {
      if (data.username === this.name) {
        this.show = false
      } else {
        alert('用户名不匹配，请重试')
      }
    })

    // 登录失败
    this.socket.on('loginFail', function() {
      alert('昵称重复')
    })

    // 新人加入提示
    this.socket.on('add', data => {
      let html = document.createElement('p')
      html.setAttribute('class', 'msg')
      html.innerHTML = `系统消息：${data.username}已加入群聊`
      console.log(html)
      chatView.appendChild(html)
    })

    // 接受消息
    this.socket.on('receiveMessage', data => {
      this.showMessage(data)
    })

    // 退出群聊提示
    this.socket.on('leave', name => {
      if (name !== null) {
        let html = document.createElement('p')
        html.setAttribute('class', 'msg')
        html.innerHTML = `warning:${name}已退出群聊`
        chatView.appendChild(html)
      }
    })

    document.onkeydown = event => {
      if (event.keyCode === 13) {
        this.sendMessage()
      }
    }
  },
  methods: {
    // 登录
    login() {
      console.log(this.name)
      if (this.name.trim()) {
        // 向服务器发送登录事件
        this.socket.emit('login', { username: this.name })
      } else {
        alert('请输入您的呢称')
      }
    },
    // 发送消息
    sendMessage() {
      if (this.txt.trim()) {
        this.socket.emit('sendMessage', { username: this.name, message: this.txt })
        this.txt = '' // 发送完成后清空输入框
      } else {
        alert('请输入要发生的消息哦')
      }
    },
    // 显示信息
    showMessage(data) {
      let html = document.createElement('div')
      let chatView = document.getElementById('chat-con')
      if (data.username === this.name) {
        html.innerHTML =
          '<div class="chat-item item-right"><span class="img"></span><span class="message">' +
          data.message +
          '</span></div>'
      } else {
        html.innerHTML =
          '<div class="chat-item item-left rela"><span class="abs uname">' +
          data.username +
          '</span><span class="img"></span><span class="message">' +
          data.message +
          '</span></div>'
      }
      chatView.appendChild(html)
    },
    // 返回上一个页面
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
<style lang='less'>
#chat-con {
  width: 100%;
  padding: 1rem 0;
  box-sizing: border-box;
  text-align: center;
  .msg {
    display: inline-block;
    padding: 2px 5px;
    margin: 5px auto;
    background: rgba(0, 0, 0, 0.35);
    color: #ffffff;
    border-radius: 3px;
  }
  div {
    width: 100%;
    display: flex;
    .item-right {
      justify-content: flex-end;
    }
    .item-left {
      justify-content: flex-start;
    }
    .chat-item {
      margin: 5px 0;
      padding: 0 10px;
      .message {
        padding: 0px 10px;
        line-height: 40px;
        background: #62b900;
        border-radius: 5px;
        font-size: 14px;
      }
      .img {
      }
    }
  }
}
</style>
