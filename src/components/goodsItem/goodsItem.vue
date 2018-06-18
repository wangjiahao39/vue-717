<template>
    <dl class="goodsItem-dl" @click="goToDetail">
        <dt><img v-lazy="data.imageurl" alt=""></dt>
        <dd>
            <p>{{data.wname}}</p>
            <p>
                <span>{{data.jdPrice}}</span>
                <span @click.stop="addcar" class="iconfont icon-caigou-xianxing"></span>
            </p>
        </dd>
    </dl>
</template>
<script>
export default {
    props:{
        data:{
            required:true,
            type:Object
        }
    },
    methods:{
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
