<template>
    <div class="topupway">
        <div class="topupway-top">
            <b @click="beforeaccount">＜</b>
            <h1>充值方式</h1>
        </div>
        <ul class="topupway-list">
            <li>
                <span class="iconfont icon-chongzhi-copy"></span>
                <span>微信</span>
                <b>></b>
            </li>
            <li>
                <span class="iconfont icon-tixian"></span>
                <span>支付宝</span>
                <b>></b>
            </li>
            <li>
                <span class="iconfont icon-tixian"></span>
                <span>717卡</span>
                <b>></b>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods:{
        beforeaccount(){
            this.$router.push({
                name:'account'
            })
        }
    }
}
</script>
<style>
.topupway-top{
    height: 0.9rem;
    position: relative;
    padding: 0 .3rem;
}
.topupway-top b{
    line-height: .9rem;
    position: absolute;
}
.topupway-top h1{
    line-height: .9rem;
    text-align: center;
    font-size: .32rem;
}
.topupway-list li{
    height: 1rem;
    padding: 0 .3rem;
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    background: #fff;
}
.topupway-list li span:nth-child(1){
    font-size: .5rem;
}
.topupway-list li b{
    float: right;
}
</style>
