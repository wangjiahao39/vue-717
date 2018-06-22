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
// import './dialog.css'
import DialogItem from './dialog.vue'
let Dialog = {
    install(Vue, options) {
        const dialogBus = new Vue({})
        console.log(options)
        Object.defineProperty(Vue.prototype,"$dialogBus",{
            value:dialogBus
        })

        Vue.component('Dialog', {
            template:`
            <div class="dialog">
                <transition-group name="dialog">
                    <DialogItem v-for="(x,v) in msg" :key="v">{{x}}</DialogItem>
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
                DialogItem
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
                dialogBus.$on('dialog',(msg)=>{
                    this.active(msg)
                })
            }
        })
    }
}

export default Dialog