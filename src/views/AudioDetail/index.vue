<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      audioUrl: ''
    }
  },
  created() {
    this.getAudioUrl()
  },
  methods: {
    async getAudioUrl() {
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
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      console.log(res.data)
      this.audioUrl = res.data.showList[showId].show.audioURL.urls[1].url
    }
  }
}
</script>
