<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Music</router-link>
      <router-link to="/audio">Audio</router-link>
    </div>
    <audio v-show="isShow" :src="url" id="audio" controls preload="auto" loop="loop" autoplay></audio>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
      url: ''
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      if (to.name === 'musicDetail') {
        let payload = {
          type: 'song',
          id: this.$route.query.id,
          br: 128000
        }
        this.isShow = true
        this.$store.dispatch('music/url', payload).then(res => {
          this.url = this.$store.state.music.musicUrl
        })
      } else if (to.name === 'audioDetail') {
        const showId = this.$route.query.shows
        let payload = {
          type: 'skip_show',
          id: this.$route.query.id,
          shows: showId
        }
        this.isShow = true
        this.$store.dispatch('audio/url', payload).then(res => {
          console.log(res, '--**-')
          this.url = this.$store.state.music.audioUrl
        })
      } else {
        this.isShow = false
      }
    }
  },
  // computed: {
  //   ...mapState({
  //     url: state => state.music.musicUrl
  //   })
  // },
  created() {},
  methods: {}
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
  z-index: 99;
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
#audio {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
  bottom: 100px;
  margin: 0 auto;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50vw);
  opacity: 0.3;
}
</style>
