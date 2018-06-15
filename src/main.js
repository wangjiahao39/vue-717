import Vue from 'vue'
import App from './App.vue'
//引用配置模块
import router from './router/index'
//引用iconfont样式
import './assets/icon/iconfont.css'
import './assets/reset.css'
//引用数据请求模块
import http from './utils/request'
//lazyload
import LazyLoad from 'vue-lazyload'
//引用vuex
import Store from './store/store'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(http)
Vue.use(LazyLoad,{
  loading:'/src/assets/images/loading2.gif'
})

new Vue({
  el: '#app',
  router,
  store:Store,
  render: h => h(App)
})
