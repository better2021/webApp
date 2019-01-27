<template>
  <div id="audioPlay">
    <HelloWorld msg="企鹅FM"/>
    <p class="timebox">{{time}}</p>
    <div class="menuList">
      <span
        v-for="(todo,index) in list"
        :class="{active:selected === index}"
        :key="todo.id"
        @click="selectMenu(todo,index)"
      >{{todo.name}}</span>
    </div>
    <div class="audioBox">
      <ul>
        <li v-for="(item,index) in audioList" :key="index" @click="player(item)">
          <img :src="item.album.owner.logo">
          <div class="text">
            <h4>{{item.album.name}}</h4>
            <p>{{item.album.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      loading: false,
      selected: 2,
      time: new Date().toLocaleTimeString(),
      audioList: [],
      list: [
        { name: '全部专辑', id: 39104 },
        { name: '广播电台', id: 39137 },
        { name: '内涵段子', id: 106 },
        { name: '健康养生', id: 39131 },
        { name: '语言学习', id: 39127 },
        { name: '互联网', id: 40071 },
        { name: '影视精选', id: 38985 },
        { name: '榜单', id: 101 },
        { name: '情感治愈', id: 109 },
        { name: '晚安心语', id: 39105 },
        { name: '美文故事', id: 39106 },
        { name: '恋爱宝典', id: 38983 },
        { name: '两性夜话', id: 107 },
        { name: '旅行人文', id: 108 },
        { name: '糗事百科', id: 38979 }
      ]
    }
  },
  created() {
    this.getAudioList()
  },
  mounted() {
    setInterval(() => {
      let date = new Date()
      this.time = date.toLocaleTimeString()
    }, 1000)
  },
  methods: {
    async getAudioList(id = 106) {
      this.loading = true
      const res = await this.axios({
        url: 'https://api.imjad.cn/qqfm/v1/',
        method: 'GET',
        params: {
          type: 'album', // album =>专辑列表,show =>节目列表,skip_show =>节目详情
          id, // 39137广播电台,106内涵段子,39131健康养生,39127语言学习,40071互联网,38985影视精选,101榜单,39104全部专辑
          page: 1,
          page_size: 21
        }
      })
      this.loading = false
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      // console.log(res)
      this.audioList = res.data.albumInfoList
    },
    // 跳转至详情
    player(item) {
      this.$router.push({
        path: '/audioDetail',
        query: {
          id: item.album.albumID,
          shows: `rd${item.allShowList[0].strMid}`
        }
      })
    },
    // 选择菜单
    selectMenu(todo, index) {
      // console.log(todo.id)
      this.selected = index
      this.getAudioList(todo.id)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
