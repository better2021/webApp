<template>
  <div id="detail">
    <div class="header">
      <p>
        <span>{{name}}</span>
      </p>
      <i class="iconBack" @click="goBack"></i>
    </div>

    <div class="desc">
      <p>{{new Date()|timeFormat}}</p>
      <span>{{desc}}</span>
    </div>
    <div class="musicBg" :style="`background:url(${logo}) center no-repeat`"></div>
    <div class="pic goMove" :style="`background:url(${logo}) center no-repeat`"></div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      desc: '',
      logo: '',
      loading: false
    }
  },
  created() {
    this.getAudioUrl()
  },
  methods: {
    async getAudioUrl() {
      this.loading = true
      const showId = this.$route.query.shows
      const res = await this.axios({
        url: 'https://api.imjad.cn/qqfm/v1/',
        method: 'GET',
        params: {
          type: 'skip_show',
          id: this.$route.query.id,
          shows: showId
        }
      })
      this.loading = false
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      // console.log(res.data)
      this.name = res.data.showList[showId].show.name
      this.desc = res.data.showList[showId].show.owner.desc
      this.logo = res.data.showList[showId].show.owner.logo
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
