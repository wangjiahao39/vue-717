<template>
    <div class="list"> 
        <span :class="checkedClass" @click="flag=!flag"></span>
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
import {getCookie,bus} from '../../utils/utils'
export default {
    props:{
        data:{
            required:true,
            type:Object
        }
    },
    data(){
        return {
            flag:false,
            arr:[]
        }
    },
    mounted(){
        bus.$on('selected-all',(selected)=>{
            console.log(selected)
            this.flag = selected
        })
        this.arr.push(this.data.wareId)
        bus.$emit('newarr',this.arr)
    },
    computed:{
        checkedClass(){
            let str = 'iconfont '
            return this.flag?str+'icon-danxuankuangyixuanzhong':str+'icon-radiobt_1'
        }
    },
    watch:{
        flag(n,o){
            bus.$emit("goodsCheaked",{//自定义事件，挂在bus实例上
                name:this.data.wname,
                price:n?this.data.count*this.data.jdPrice:0
            })
        },
        data(n,o){
            bus.$emit("goodsCheaked",{//自定义事件，挂在bus实例上
                name:this.data.wname,
                price:this.flag?this.data.count*this.data.jdPrice:0
            })
        }
    },
    methods:{
        decrement(){
            let count = this.data.count
            if(count-1<=0){
                return
            }
            this.$http.post('/api/shopcar/count',{
                token:getCookie('token'),
                count:count-1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code == 1){
                    //bus.$emit('update')
                    this.$store.dispatch('fetchShoplist')
                }
            })
        },
        increment(){
            let count = this.data.count
            if(count+1>10){
                return
            }
            this.$http.post('/api/shopcar/count',{
                token:getCookie('token'),
                count:count+1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code == 1){
                    //bus.$emit('update')
                    this.$store.dispatch('fetchShoplist')
                }
            })
        }
    }
}
</script>
<style>

</style>
