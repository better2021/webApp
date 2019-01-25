import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/rem' // 自适应字体布局单位
import axios from './libs/axios'
import Loading from './components/Loading'
Vue.config.productionTip = false

Vue.component('Loading', Loading) // 全局注册Loading组件
// 全局注册axios的api请求
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
