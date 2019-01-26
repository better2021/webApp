<template>
  <div id="audioPlay">
    <HelloWorld msg="企鹅FM"/>
    <p class="timebox">{{time}}</p>
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
      time: new Date().toLocaleTimeString(),
      audioList: []
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
    async getAudioList() {
      const res = await this.axios({
        url: 'https://api.imjad.cn/qqfm/v1/',
        method: 'GET',
        params: {
          type: 'album', // album =>专辑列表,show =>节目列表,skip_show =>节目详情
          id: 106, // 39137广播电台,106内涵段子,39131健康养生,39127语言学习,40071互联网,38985影视精选,101榜单,39104全部专辑
          page: 1,
          page_size: 21
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

<style lang="less" scoped>
#audioPlay {
  .audioBox {
    width: 100%;
    padding: 10px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        position: relative;
        width: 3.5rem;
        height: 3.5rem;
        margin: 5px 0;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 0px 5px #dddddd;
        img {
          width: 100%;
          height: 100%;
        }
        .text {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          padding: 3px 5px;
          h4 {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
            font-size: 14px;
            line-height: 24px;
          }
          p {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 12px;
            line-height: 20px;
          }
        }
      }
    }
  }
  .timebox {
    text-align: center;
  }
}
</style>
