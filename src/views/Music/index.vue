<template>
  <div id="musicBox">
    <div class="topSearch">
      <div class="searchBox">
        <input v-model="txt" type="text" placeholder="请输入您要搜索的歌曲" @keyup.enter="search">
        <button @click="search"></button>
      </div>
      <div class="list" v-if="list.length!==0">
        <span v-for="(todo,index) in list" :key="index" @click="handlePlay(todo)">{{todo}}</span>
      </div>
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
      txt: '',
      loading: false,
      list: JSON.parse(localStorage.getItem('musicList')) || ['有美人兮', '生僻字'],
      dataSorce: []
    }
  },
  created() {
    let title = this.$store.state.music.musicTitle
    this.getMusicList(title)
  },
  methods: {
    async getMusicList(title) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
      let res = await this.axios({
        url: 'https://api.apiopen.top/searchMusic',
        method: 'GET',
        params: { name: title }
      })

      this.loading = false
      // console.log(res)
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      this.txt = ''
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
    handlePlay(title) {
      this.$store.commit('music/musicTitle', title)
      this.getMusicList(title)
    },
    // 搜索
    search() {
      const title = this.txt
      if (title.replace(/\s+/g, '') === '') {
        console.log('请输入搜素关键词')
        return
      }
      // console.log(this.list)
      this.list.push(title)
      this.list = this.list.slice(-5)
      let musicList = Array.from(new Set(this.list))
      localStorage.setItem('musicList', JSON.stringify(musicList))
      this.$store.commit('music/musicTitle', title)
      this.getMusicList(title)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
