<template>
  <div id="pixiv">
    <div class="box">
      <ul>
        <li v-for="item in dataSource" :key="item.sid">
          <video :src="item.video" controls></video>
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
    }
  }
}
</script>

<style lang="less" scoped>
#pixiv {
  .box {
    width: 100%;
    ul {
      padding: 10px;
      li {
        margin-bottom: 10px;
        video {
          width: 100%;
        }
        p {
          text-align: center;
          span {
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
