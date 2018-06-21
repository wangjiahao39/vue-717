/**
 * @actionName Toast
 * 功能，提示条
 * 
 * @param msg string/component/node
 * 
 * @callback active 显示提示信息
 * 
 */

import toast from './toast.vue'
let Toast = {
    install(Vue,options){
        console.log(options)

        //全局组件
        Vue.component('Toast',toast)
    }
}

export default Toast