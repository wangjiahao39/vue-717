/**
 * @actionName Toast
 * 功能，提示条
 * 
 * @param msg string/component/node
 * 
 * @callback active 显示提示信息
 * 
 * @param $toastBus toast组件专用的全局bus
 * 
 * @event toast 显示提示信息
 * 
 */
import './toast.css'
import ToastItem from './toast.vue'
let Toast = {
    install(Vue, options) {
        const toastBus = new Vue({})
        console.log(options)
        Object.defineProperty(Vue.prototype,"$toastBus",{
            value:toastBus
        })

        Vue.component('Toast', {
            template:`
            <div class="toast">
                <transition-group name="toast">
                    <ToastItem v-for="(x,v) in msg" :key="v">{{x}}</ToastItem>
                </transition-group>
            </div>
            `,
            data() {
                return {
                    msg: [],
                    timeout: options.timeout
                }
            },
            components:{
                ToastItem
            },
            methods: {
                active(msg, options) {
                    if (options) {
                        this.timeout = options.timeout
                    }
                    this.msg.push(msg)
                    this.isActive = true
                }
            },
            mounted(){
                toastBus.$on('toast',(msg)=>{
                    this.active(msg)
                })
            }
        })
    }
}

export default Toast