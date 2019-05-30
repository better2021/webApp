<template>
  <div id="chat">
    <div class="loginBox" v-show="show">
      <div class="login">
        <h3>用户登录</h3>
        <input type="text" class="text" v-model="name" placeholder="请输入您的昵称">
        <br>
        <input type="button" class="btn" value="登录" @click="login">
        <p>
          当前的网络类型为：
          <span style="color:#f00">{{netWork}}</span>
        </p>
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
import notifyMe from '@/libs/notice'

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
      txt: '', // 发送的信息
      netWork: ''
    }
  },
  mounted() {
    // 检测设备当前的网络类型
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    console.log(connection, '666')
    this.netWork = connection.effectiveType

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
      html.innerHTML = `系统消息：<span style="color:#F2C047">${data.username}</span>已加入群聊`
      console.log(html)
      chatView.appendChild(html)
    })

    // 接受消息
    this.socket.on('receiveMessage', data => {
      console.log(data, '---')
      this.showMessage(data)
      notifyMe(data.username, {
        body: data.message,
        icon: 'https://i.loli.net/2019/04/13/5cb154d3bcd8c.jpg'
      })

      // 设置滚动行为改为平滑的滚动
      window.scrollTo({
        top: chatView.scrollHeight,
        behavior: 'smooth'
      })
    })

    // 退出群聊提示
    this.socket.on('leave', name => {
      if (name !== null) {
        let html = document.createElement('p')
        html.setAttribute('class', 'msg')
        html.innerHTML = `warning:<span style="color:#F2C047">${name}</span>已退出群聊`
        chatView.appendChild(html)

        notifyMe('提示信息', {
          body: `系统提醒：${name}已退出群聊`,
          icon: 'https://i.loli.net/2019/04/13/5cb1600e5ba58.jpg'
        })
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
      let chatView = document.getElementById('chat-con')
      // console.log(chatView.scrollHeight)
      if (this.txt.trim()) {
        this.socket.emit('sendMessage', { username: this.name, message: this.txt })
        this.txt = '' // 发送完成后清空输入框
      } else {
        alert('请输入要发生的消息哦')
      }
      // 设置滚动行为改为平滑的滚动
      window.scrollTo({
        top: chatView.scrollHeight,
        behavior: 'smooth'
      })
    },
    // 显示信息
    showMessage(data) {
      let html = document.createElement('div')
      let chatView = document.getElementById('chat-con')
      if (data.username === this.name) {
        html.innerHTML =
          '<div class="chat-item item-right"></span><span class="message">' +
          data.message +
          '</span><span class="img"></div>'
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
      margin: 10px 0;
      padding: 0 10px;
      position: relative;
      .message {
        padding: 0px 10px;
        line-height: 40px;
        background: #62b900;
        border-radius: 5px;
        font-size: 14px;
      }
      .img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 3px;
        background: url(../../assets/img/user.jpg) no-repeat center;
        background-size: 100% 100%;
        background-position: 0 -3px;
      }
      .uname {
        position: absolute;
        top: -15px;
        font-size: 10px;
        color: #666666;
      }
    }
  }
}
</style>
