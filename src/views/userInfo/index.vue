<template>
  <div id="userInfo">
    <van-notice-bar :text="textInfo" left-icon="volume-o"/>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="value"/>
      <van-button type="info" size="small" @click="handleSearch">搜索</van-button>
    </div>
    <div class="box">
      <template v-if="!Object.keys(dataSource).length">
        <van-loading type="spinner" color="#f00f00" vertical/>
      </template>
      <template v-else>
        <img :alt="dataSource.name" :src="dataSource.avatar_url">
        <p>{{dataSource.bio}}</p>
        <p>
          <van-tag mark type="primary" size="medium">创建时间：</van-tag>
          {{dataSource.created_at.substring(0,10)}}
        </p>
        <p>
          <van-tag color="#7232dd" size="medium">地区：</van-tag>
          {{dataSource.location}}
        </p>
        <p></p>
      </template>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Menu from '../../components/Menu'
export default {
  components: {
    Menu
  },
  data() {
    return {
      value: 'feiyuWeb',
      textInfo: 'vant的滚动消息，talk is cheap,show me the code,生活不止有code，还有happy',
      dataSource: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      Toast.loading({
        mask: true,
        loadingType: 'spinner',
        message: '加载中...'
      })
      let res = await this.axios({
        url: `https://api.github.com/users/${this.value}`,
        method: 'GET'
      })
      Toast.clear() //  关闭提示
      console.log(res)
      this.dataSource = res
    },
    // 搜索
    handleSearch() {
      if (!this.value.trim()) {
        Toast.fail({
          mask: false,
          duration: 1500,
          message: '请输入关键词'
        })
        return
      }
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
#userInfo {
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    text-align: center;
    img {
      width: 60vw;
      margin: 10px 0;
      box-shadow: 0px 0px 3px #999999;
    }
    p {
      line-height: 30px;
    }
  }
}
</style>
