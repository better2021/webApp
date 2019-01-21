<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <audio :src="url" controls style="display:none"></audio>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    // 获取歌曲url地址
    async getMusic () {
      const res = await this.axios({
        url: 'https://api.imjad.cn/cloudmusic/',
        method: 'get',
        params: {
          type: 'song',
          id: this.$route.query.id,
          br: 128000
        }
      })
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      this.url = res.data[0].url
      console.log(this.url)
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body {
  max-width: 720px;
  min-width: 320px;
  margin: 0 auto;
}
ul,
input,
button {
  border: none;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 50px;
  font-size: 14px;
}
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 175, 118, 0.6);
  border-radius: 3px;
  a {
    margin: 10px;
    font-size: 0.3rem;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
