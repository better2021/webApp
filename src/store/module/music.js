import axios from '../../libs/axios'

export default {
  state: {
    musicTitle: '有美人兮', // 歌曲的名称
    musicUrl: '' // 歌曲的url地址
  },
  mutations: {
    ['music/musicUrl'](state, payload) {
      state.musicUrl = payload
    },
    ['music/musicTitle'](state, payload) {
      state.musicTitle = payload
    }
  },
  actions: {
    //  获取歌曲url地址
    async ['music/url'](context, payload) {
      const res = await axios({
        url: 'https://api.imjad.cn/cloudmusic/',
        method: 'GET',
        params: payload
      })
      if (res.status === 200) {
        context.commit('music/musicUrl', res.data[0] ? res.data[0].url : '')
        return res
      }
    }
  }
}
