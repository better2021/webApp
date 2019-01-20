import Vue from 'vue'
import Router from 'vue-router'
import Music from './views/Music'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'music',
      component: Music
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video')
    },
    {
      path: '/musicDetail',
      name: 'musicDetail',
      component: () => import('./views/MusicDetail')
    }
  ]
})
