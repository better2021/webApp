<template>
  <div id="pixiv"></div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { name: '日榜', type: 'day' },
        { name: '周榜', type: 'week' },
        { name: '月榜', type: 'month' },
        { name: '新人', type: 'week_rookie' },
        { 原创: '周榜', type: 'week_original' },
        { name: '男性向', type: 'day_male' },
        { name: '女性向', type: 'day_female' }
      ]
    }
  },
  created() {
    this.getPic()
    // https://api.imjad.cn/interface/img/PixivProxy.php?url=https://i.pximg.net/c/540x540_70/img-master/img/2019/01/19/00/00/06/72727026_p0_master1200.jpg
    // https://api.imjad.cn/interface/img/PixivProxy.php?url=https://i.pximg.net/c/540x540_70/img-master/img/2019/01/19/00/01/14/72727118_p0_master1200.jpg
  },
  methods: {
    async getPic() {
      let res = await this.axios({
        url: 'https://api.imjad.cn/pixiv/v2/',
        methid: 'GET',
        params: {
          type: 'rank',
          mode: 'week',
          page: 1,
          offset: 10
        }
      })
      console.log(res)
      if (res.status !== 200) {
        console.log(res.message)
        return
      }
      console.log(res.data)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
