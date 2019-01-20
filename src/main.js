import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/rem' // 自适应字体布局单位
import axios from './libs/axios'
Vue.config.productionTip = false

// 全局注册axios的api请求
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
