<template>
    <div class="list"> 
        <span class="iconfont icon-danxuankuangyixuanzhong"></span>
        <img :src="data.imageurl" />
        <div class="listRight">
            <p class="text">{{data.wname}}</p>
            <div>
                <b>${{data.jdPrice}}</b>
                <span @click="decrement">-</span>
                <span>{{data.count}}</span>
                <span @click="increment">+</span>
            </div>
        </div>
    </div>
</template>
<script>
import {getCookie} from '../../utils/utils'
export default {
    props:{
        data:{
            required:true,
            type:Object
        }
    },
    data(){
        return {

        }
    },
    methods:{
        decrement(){
            let count = this.data.count
            this.$http.get('/api/shopcar/count',{
                token:getCookie('token'),
                count:count--
            })
        },
        increment(){
            let count = this.data.count
            this.$http.get('/api/shopcar/count',{
                token:getCookie('token'),
                count:count++
            })
        }
    }
}
</script>
<style>

</style>
