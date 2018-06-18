<template>
    <h1>shopcar</h1>
</template>
<script>
import {getCookie} from '../../utils/utils.js'
export default {
    mounted(){
        //请求购物车列表
        this.$http.post('/api/goodslist',{
            token:getCookie('token')
        }).then(res=>{
            if(res.code==0){
                this.$router.push({
                    name:'login',
                    query:{
                        from:'shopcar'
                    }
                })
            }else{
                console.log(res)
            }
        })
    }
}
</script>
<style>

</style>
