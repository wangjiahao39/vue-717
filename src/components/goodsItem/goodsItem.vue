<template>
    <dl class="goodsItem-dl" @click="goToDetail">
        <dt><img v-lazy="data.imageurl" alt=""></dt>
        <dd>
            <p>{{data.wname}}</p>
            <p>
                <span>{{data.jdPrice}}</span>
                <span @click.stop="addCar" class="iconfont icon-caigou-xianxing"></span>
            </p>
        </dd>
    </dl>
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
    methods:{
        addCar(){
            this.$http.post('/api/addCar',{
                token:getCookie('token'),
                data:this.data
            }).then(res=>{
                if(res.code===0){
                    this.$router.push({
                        name:'login'
                    })
                }else{
                    console.log(res.msg)
                }
            })
        },
        goToDetail(){
            this.$router.push({
                name:'detail',
                query:{
                    url:encodeURIComponent(this.data.clickUrl)
                }
            })
        }
    }
}
</script>
<style>
.goodsItem-dl{
    padding: 10px;
    box-sizing: border-box;
}
.goodsItem-dl dt img{
    width: 70%;
    margin-left: 15%;
    margin-bottom: 10px;
}
.goodsItem-dl dd p{
    text-overflow:ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    width:100%; 
}
</style>
