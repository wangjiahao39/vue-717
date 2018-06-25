<template>
    <div class="myorder">
        <div class="myorder-header">
            <span @click="beforemine">＜</span>
            <h1>我的订单</h1>
            <i class="iconfont icon-xiaoxi"></i>
        </div>
        <ul class="myorder-list">
            <router-link :to="{name:'order-all'}">
                <li>全部</li>
            </router-link>
            <router-link :to="{name:'order-obligation'}">
                <li>待付款</li>
            </router-link>
            <router-link :to="{name:'order-send'}">
                <li>代发货</li>
            </router-link>
            <router-link :to="{name:'order-receiving'}">
                <li>待收货</li>
            </router-link>
            <router-link :to="{name:'order-after'}">
                <li>售后</li>
            </router-link>
        </ul>
        <router-view class="content"></router-view>
    </div>
</template>
<script>
export default {
    methods:{
        beforemine(){
            this.$router.push({
                name:'mine'
            })
        }
    }
}
</script>
<style>
.myorder{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.myorder-header{
    height: 0.9rem;
    background: #f9f9f9;
    position: relative;
}
.myorder-header span{
    display: inline-block;
    width: 10%;
    position: absolute;
    line-height: 0.9rem;
    left: 10px;
    font-size: .40rem;
}
.myorder-header h1{
    text-align: center;
    font-size: .32rem;
    line-height: 0.9rem;
}
.myorder-header i{
    display: inline-block;
    width: 10%;
    text-align: center;
    position: absolute;
    line-height: 0.9rem;
    right: 10px;
    top: 0;
    font-size: .40rem;
    z-index: 2;
}
.myorder-list{
    display: flex;
    background: #fff;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #ccc;
}
.myorder-list a{
    flex: 1;
    text-align: center;
    line-height: .9rem;
    font-size: 16px;
    text-decoration: none;
}
.router-link-exact-active{
    color: red;
}
.content{
    height: 100%;
    overflow: auto;
}
</style>
