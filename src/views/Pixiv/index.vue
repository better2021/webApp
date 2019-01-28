<template>
  <div id="pixiv">
    <div class="header">
      <p>
        <span>开心一下~</span>
      </p>
      <i class="iconBack" @click="goBack"></i>
    </div>

    <div class="box">
      <ul>
        <li v-for="item in dataSource" :key="item.sid">
          <video
            :src="item.video"
            :poster="item.thumbnail"
            controls
            playsinline
            webkit-playsinline="true"
            preload="auto"
            class="video"
            @click="player($event)"
          ></video>
          <p>{{item.text}}</p>
          <p>更新时间：{{item.passtime}}</p>
        </li>
      </ul>
    </div>
    <Loading v-show="loading"></Loading>
    <Menu></Menu>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Menu from '../../components/Menu'
export default {
  components: {
    Menu
  },
  data() {
    return {
      loading: false,
      dataSource: []
    }
  },
  created() {
    this.getJoke()
  },
  methods: {
    async getJoke() {
      this.loading = true
      let res = await this.axios({
        url: 'https://api.apiopen.top/getJoke',
        methid: 'GET',
        params: {
          type: 'video',
          page: 1,
          count: 10
        }
      })
      this.loading = false
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      console.log(res.result)
      this.dataSource = res.result
    },
    player(event) {
      const video = document.querySelectorAll('.video')
      const videoList = Array.from(video) // 或者用解构赋值 [...video]
      for (let i of videoList) {
        i.pause()
      }
      // console.log(event.target)
      let target = event.target
      if (target.paused) {
        target.play()
      } else {
        target.pause()
      }
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
