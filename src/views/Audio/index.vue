<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{new Date()|timeFormat}}</p>
    <ul>
      <li v-for="(item,index) in audioList" :key="index" @click="player(item)">
        <img :src="item.album.owner.logo">
        <div>
          <h4>{{item.album.name}}</h4>
          <p>{{item.album.desc}}</p>
        </div>
      </li>
    </ul>
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
      audioList: []
    }
  },
  created() {
    this.getAudioList()
  },
  methods: {
    async getAudioList() {
      const res = await this.axios({
        url: 'https://api.imjad.cn/qqfm/v1/',
        method: 'GET',
        params: {
          type: 'album', // album =>专辑列表,show =>节目列表,skip_show =>节目详情
          id: 106, // 39137广播电台,106内涵段子,39131健康养生,39127语言学习,40071互联网,38985影视精选,101榜单,39104全部专辑
          page: 1,
          page_size: 20
        }
      })
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
    }
  }
}
</script>
