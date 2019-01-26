<template>
  <div id="detail">
    <div class="header" @click="goBack">
      <p>
        <span>{{name}}</span>
      </p>
      <i class="iconBack"></i>
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
#detail {
  position: fixed;
  width: 100vw;
  height: 100vh;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 3px 0 #dddddd;
    p {
      span {
        color: #e86261;
        font-weight: 500;
        font-size: 14px;
      }
    }
    .iconBack {
      position: absolute;
      left: 10px;
      z-index: 999;
      display: inline-block;
      width: 36px;
      height: 36px;
      background: url(../../assets/img/back.png) center no-repeat;
      background-size: cover;
    }
  }
  .musicBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    filter: blur(35px);
    -webkit-filter: blur(35px);
  }
  .desc {
    padding: 10px;
    margin-top: 1rem;
    p {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
    span {
      font-size: 12px;
      text-indent: 2em;
    }
  }
  .pic {
    width: 60vw;
    height: 60vw;
    border-radius: 100%;
    margin: 1rem auto;
    background-size: 110% !important;
    border: 10px rgba(255, 255, 255, 0.5) solid;
  }
  .goMove {
    animation: move 20s infinite linear;
  }
}

@keyframes move {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
