<template>
  <div id="detail">
    <div class="header">
      <p>
        <span>{{name}}</span>
      </p>
      <p>{{author}}</p>
    </div>
    <div class="musicBg" :style="`background:url(${picUrl}) center no-repeat`"></div>
    <div class="pic goMove" :style="`background:url(${picUrl}) center no-repeat`"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      author: '',
      name: '',
      picUrl: ''
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    // 获取音乐详情
    async getDetail () {
      const res = await this.axios({
        url: 'https://api.imjad.cn/cloudmusic/',
        method: 'get',
        params: {
          type: 'detail',
          id: this.$route.query.id
        }
      })
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      this.author = res.songs[0].ar[0].name
      this.name = res.songs[0].al.name
      this.picUrl = res.songs[0].al.picUrl
      console.log(this.author, this.name, this.picUrl)
    }
  }
}
</script>

<style lang="less" scoped>
#detail {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 3px 0 #dddddd;
    p {
      span {
        color: #e86261;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  .musicBg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    filter: blur(50px);
  }
  .pic {
    width: 80vw;
    height: 80vw;
    border-radius: 100%;
    margin: 3rem auto;
    background-size: cover !important;
    border: 10px rgba(255, 255, 255, 0.5) solid;
  }
  .goMove {
    animation: move 20s infinite linear;
  }
}

@keyframes move {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
