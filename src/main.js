import Vue from 'vue'
import App from './App.vue'
//引用配置模块
import router from './router/index'
//引用iconfont样式
import './assets/icon/iconfont.css'
import './assets/reset.css'
//引用数据请求模块
import http from './utils/request'
Vue.use(http)
//lazyload
import LazyLoad from 'vue-lazyload'
Vue.use(LazyLoad, {
    loading: '/src/assets/images/loading2.gif'
})
//引用vuex
import Store from './store/store'
//引用验证组件
import VueLidate from 'vuelidate'
Vue.use(VueLidate)

Vue.config.productionTip = false
Vue.config.devtools = false

//应用自定义toast组件
import Toast from './plugins/toast/toast'
//import Toast from "j-toast";
Vue.use(Toast, {
    name: 'Toast',
    timeout:2000,
    autoclose:false
})

new Vue({
    el: '#app',
    router,
    store: Store,
    render: h => h(App)
})
