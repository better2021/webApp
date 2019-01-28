<template>
  <div id="pixiv">
    <div class="header">
      <p>
        <span>开心一下~</span>
      </p>
      <i class="iconBack" @click="goBack"></i>
    </div>

    <div class="box">
      <!-- 刷新提示信息 -->
      <div class="top-tip" v-show="pullDown">
        <span class="refresh-hook">下拉刷新成功</span>
      </div>
      <div class="scorllBox" ref="wrapper">
        <ul>
          <li v-for="(item,index) in dataSource" :key="`${item.uid}${index}`">
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
      <!-- 底部提示信息 -->
      <div class="bottom-tip" v-show="pullUp">
        <span class="loading-hook">正在加载更多数据...</span>
      </div>
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
      pullUp: false,
      pullDown: false,
      page: 1,
      dataSource: [],
      isload: true // 是否加载
    }
  },
  created() {
    this.getJoke()
  },
  mounted() {
    let Scroll = new BScroll(this.$refs.wrapper, {
      probeType: 2,
      bounceTime: 700, // 回弹时间
      pullUpLoad: {
        threshold: 30 // 当上拉距离超过盒子高度的10px的时候,就派发一个上拉加载的事件
      },
      pullDownRefresh: {
        threshold: -30 // 当下拉长度距离盒子顶部的高度超过10px的时候,就派发一个下拉刷新的事件
      },
      useTransition: false // 防止iphone微信滑动卡顿
    })
    Scroll.on('scroll', pos => {
      // 如果下拉超过30px 就显示下拉刷新的文字
      // console.log(pos, '----')
      this.pullDown = pos.y > 30
      this.pullUp = pos.y < Scroll.maxScrollY - 30
    })
    Scroll.on('pullingUp', () => {
      // 上拉加载事件
      console.log('加载ajax数据')
      if (this.isload) {
        this.page += 1
        this.getJoke().then(res => {
          console.log(res, '---')
          console.log(this.dataSource, '1231313')
          this.dataSource = this.dataSource.concat(res)
        })
        Scroll.finishPullUp() // 可以多次执行上拉加载，没有这段代码上拉只会加载一次
      }
    })
    Scroll.on('pullingDown', () => {
      // 下拉刷新事件
      console.log('下拉刷新数据')
      this.getJoke()
      Scroll.finishPullDown() // 可以多次执行下拉刷新，没有这段代码下只会刷新一次
    })
    Scroll.refresh() // 初始化demo  当异步加载数据的时候，重新渲染页面，这段代码非常重要
  },
  methods: {
    async getJoke() {
      this.isload = false
      this.loading = true
      let res = await this.axios({
        url: 'https://api.apiopen.top/getJoke',
        methid: 'GET',
        params: {
          type: 'video',
          page: this.page,
          count: 10
        }
      })
      this.isload = true
      this.loading = false
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      console.log(res.result)
      this.dataSource = res.result
      return res.result
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
