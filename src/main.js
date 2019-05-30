import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/rem' // 自适应字体布局单位
import axios from './libs/axios'
import Loading from './components/Loading'
import VueLazyload from 'vue-lazyload'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false
// 全局注册axios的api请求
Vue.prototype.axios = axios

Vue.component('Loading', Loading) // 全局注册Loading组件
const upZero = param => {
  // 时间补0
  return param < 10 ? `0${param}` : param
}
// 全局过滤器
Vue.filter('timeFormat', val => {
  if (!val) return '-'
  const year = val.getFullYear()
  const month = val.getMonth() + 1
  const day = val.getDate()
  const hour = val.getHours()
  const min = val.getMinutes()
  return `${year}-${upZero(month)}-${upZero(day)} ${upZero(hour)}:${upZero(min)}`
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://i.loli.net/2019/01/28/5c4ee2a4a3968.png',
  loading: 'https://i.loli.net/2019/01/28/5c4ee2a4a3968.png',
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
