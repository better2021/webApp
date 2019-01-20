import axios from 'axios'

// 请求超时时间
axios.defaults.timeout = 10000
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    const response = error.data
    response.status = error.response.status
    return response
  }
)

// 响应拦截
axios.interceptors.response.use(
  res => {
    const response = res.data
    response.status = res.status
    return response
  },
  error => {
    const response = error.response.data
    response.status = error.response.status
    if (response.status >= 401) {
      /* ... */
    }
    return response
  }
)

export default axios
