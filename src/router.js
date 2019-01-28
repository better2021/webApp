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
      path: '/musicDetail',
      name: 'musicDetail',
      component: () => import('./views/MusicDetail')
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('./views/Audio')
    },
    {
      path: '/audioDetail',
      name: 'audioDetail',
      component: () => import('./views/AudioDetail')
    },
    {
      path: '/pixiv',
      name: 'pixiv',
      component: () => import('./views/Pixiv')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
