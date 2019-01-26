import axios from '../../libs/axios'

export default {
  state: {
    musicTitle: '有美人兮', // 歌曲的名称
    musicUrl: '', // 歌曲的url地址
    audioUrl: '' // 音频的url地址
  },
  mutations: {
    ['music/musicUrl'](state, payload) {
      state.musicUrl = payload
    },
    ['music/musicTitle'](state, payload) {
      state.musicTitle = payload
    },
    ['audio/audioUrl'](state, payload) {
      state.audioUrl = payload
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
      } else {
        console.log(res.message)
      }
    },
    // 获取音频的url地址
    async ['audio/url'](context, payload) {
      const res = await axios({
        url: 'https://api.imjad.cn/qqfm/v1/',
        method: 'GET',
        params: payload
      })
      if (res.status === 200) {
        const showId = payload.shows
        const url = res.data.showList[showId].show.audioURL.urls[1].url || ''
        context.commit('audio/audioUrl', url)
        return res
      } else {
        console.log(res.message)
      }
    }
  }
}
