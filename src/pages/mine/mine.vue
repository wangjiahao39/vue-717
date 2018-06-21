<template>
    <div class="mine">
        <div class="mine-header">
            <span class="iconfont icon-shezhi" @click="signout"></span>
            <h1>我的717商城</h1>
            <i class="iconfont icon-xiaoxi"></i>
        </div>
        <div class="mine-banner">
            <dl>
                <dt><img src="../../assets/images/head.png" alt=""></dt>
                <dd>路飞</dd>
            </dl>
        </div>
        <p class="p">
            <img src="../../assets/images/shop.png" alt="">
            <span>我的店铺</span>
        </p>
        <div class="main-nav">
            <dl>
                <dt><i class="iconfont icon-daifukuan"></i></dt>
                <dd>待付款</dd>
            </dl>
            <dl>
                <dt><i class="iconfont icon-daifahuo"></i></dt>
                <dd>待发货</dd>
            </dl>
            <dl>
                <dt><i class="iconfont icon-daishouhuo"></i></dt>
                <dd>待收货</dd>
            </dl>
            <dl>
                <dt><i class="iconfont icon-shouhoubaozhang"></i></dt>
                <dd>售后</dd>
            </dl>
            <dl>
                <dt><i class="iconfont icon-aiguifanfile2"></i></dt>
                <dd>我的订单</dd>
            </dl>
        </div>
        <ul class="mine-list">
            <li><i class="iconfont icon-daifukuan"></i><span>账户余额</span><b>></b></li>
            <li><i class="iconfont icon-dizhiguanli"></i><span>地址管理</span><b>></b></li>
            <li><i class="iconfont icon-wodekefu"></i><span>我的客服</span><b>></b></li>
        </ul>
        <Toast ref="toast">消息已发送成功！<p slot="2">消息已发送成功2！</p><p slot="3">消息已发送成功3！</p></Toast>
    </div>
</template>
<script>
import Toast from '../../plugins/toast/toast'
export default {
    data(){
        return {
            
        }
    },
    methods:{
        signout(){
            console.log(this.$refs.toast)
            this.$refs.toast.active('消息已发送成功！')
            this.$refs.toast.active('消息已发送成功2！')
            this.$refs.toast.active('消息已发送成功3！')
        }
    }
}
</script>
<style>
.mine{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    overflow: auto;
}
.mine-header{
    height: 0.9rem;
    background: #fff;
    position: relative;
}
.mine-header span{
    position: absolute;
    line-height: 0.9rem;
    left: 10px;
    font-size: .40rem;
}
.mine-header h1{
    text-align: center;
    font-size: .32rem;
    line-height: 0.9rem;
}
.mine-header i{
    position: absolute;
    line-height: 0.9rem;
    right: 10px;
    top: 0;
    font-size: .40rem;
}
.mine-banner{
    width: 100%;
    background: url('../../assets/images/background.png') no-repeat;
    background-size: 100% 100%;
}
.mine-banner dl{
    width: 50%;
    margin-left: 25%;
    text-align: center;
    padding: .2rem 0;
    color: #fff;
}
.mine-banner dl dt{
    width: 30%;
    margin-left: 35%;
}
.mine-banner dl dt img{
    width: 100%;
}
.p{
    padding: .3rem;
    border-bottom: 1px solid #eee;
    background: #fff;
}
.p img{
    width: 10%;
}
.p>span{
    font-size: .36rem;
    color: red;
}
.main-nav{
    display: flex;
    margin-bottom: 10px;
    background: #fff;
}
.main-nav dl{
    flex: 1;
    text-align: center;
    padding: .1rem 0;
}
.main-nav dl dt i{
    font-size: .46rem;
}
.main-nav dl:nth-child(5){
    border-left: 1px solid #eee;
    box-sizing: border-box;
}
.mine-list{
    background: #fff;
}
.mine-list li{
    line-height: .85rem;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    font-size: .32rem;
}
.mine-list li i{
    font-size: .46rem;;
    margin-right: .1rem;
}
.mine-list li b{
    float: right;
}
</style>
