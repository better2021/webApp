<template>
  <div id="nav">
    <van-tabbar route v-model="active">
      <van-tabbar-item to="/" icon="home-o">Music</van-tabbar-item>
      <van-tabbar-item to="/audio" icon="volume-o">audio</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">video</van-tabbar-item>
      <van-tabbar-item to="/chat" icon="comment-o">chat</van-tabbar-item>
      <van-tabbar-item to="/userInfo" icon="friends-o">userInfo</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  computed: {
    slected() {
      return this.$route.path
    }
  },
  mounted() {
    console.log(this.slected)
    const arr = ['/', '/audio', '/video', '/chat', '/userInfo']
    const index = arr.findIndex(item => item === this.slected)
    this.active = index
  }
}
</script>

<style lang="less" scoped>
</style>
