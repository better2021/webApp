<template>
  <div id="musicBox">
    <div class="searchBox">
      <input v-model="txt" type="text" placeholder="请输入您要搜索的歌曲" @keyup.enter="search">
      <button @click="search"></button>
    </div>
    <div class="musicList">
      <ul>
        <li v-for="item in dataSorce" :key="item.songid" @click="jumpDetail(item)">
          <div class="pic" :style="`background:url(${item.pic}) center no-repeat`"></div>
          <div class="text">
            <p>{{item.author}}</p>
            <p>{{item.title}}</p>
          </div>
          <i class="arrow"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      txt: '',
      dataSorce: []
    }
  },
  created() {
    this.getMusicList()
  },
  methods: {
    async getMusicList(title = '喜欢') {
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
    jumpDetail(item) {
      console.log(item)
      this.$router.push({
        path: '/musicDetail',
        query: { id: item.songid }
      })
    },
    // 搜索
    search() {
      const title = this.txt
      this.getMusicList(title)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
