import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'https://1df51d17-4013-4d86-a2cf-431494c2d1d0.bspapp.com/mainFun'

// axios.interceptors.request.use((res) => {
//     // res.headers.Authorization = window.sessionStorage.getItem('token')
//     var end = res.data
//     return end
// });

//创建为全局文件,将$axios封装为axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

export default axios;
