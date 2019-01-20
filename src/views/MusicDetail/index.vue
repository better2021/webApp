<template>
  <div>123</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    this.getDetail()
    this.getMusic()
  },
  methods: {
    // 获取音乐详情
    async getDetail () {
      const res = await this.axios({
        url: 'https://api.imjad.cn/cloudmusic/',
        method: 'get',
        params: {
          type: 'detail',
          id: this.$route.query.id
        }
      })
      console.log(res)
    },
    async getMusic () {
      const res = await this.axios({
        url: 'https://api.imjad.cn/cloudmusic/',
        method: 'get',
        params: {
          type: 'song',
          id: this.$route.query.id,
          br: 128000
        }
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
