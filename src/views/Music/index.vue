<template>
  <div class="musicBox">
    <div class="musicList">
      <ul>
        <li v-for="item in dataSorce" :key="item.songid" @click="jumpDetail(item)">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataSorce: []
    }
  },
  created () {
    this.getMusicList()
  },
  methods: {
    async getMusicList (title = '喜欢') {
      let res = await this.axios({
        url: 'https://api.apiopen.top/searchMusic',
        method: 'GET',
        params: { name: title }
      })
      console.log(res)
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      this.dataSorce = res.result
    },
    // 跳转至音乐详情
    jumpDetail (item) {
      console.log(item)
      this.$router.push({
        path: '/musicDetail',
        query: { id: item.songid }
      })
    }
  }
}
</script>
