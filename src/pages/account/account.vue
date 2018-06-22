<template>
    <div class="account">
        <div class="account-head">
            <div class="account-top">
                <b @click="beforemine">＜</b>
                <h1>账户余额</h1>
            </div>
            <p @click="gotobill">账单</p>
            <span>账户余额</span>
            <h1 class="account-money">100.00</h1>
        </div>
        <ul class="account-list">
            <li @click="gotoupway">
                <span class="iconfont icon-chongzhi-copy"></span>
                <span>充值</span>
                <b>></b>
            </li>
            <li>
                <span class="iconfont icon-tixian"></span>
                <span>提现</span>
                <b>></b>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods:{
        beforemine(){
            this.$router.push({
                name:'mine'
            })
        },
        gotoupway(){
            this.$router.push({
                name:'topupway'
            })
        },
        gotobill(){
            this.$router.push({
                name:'bill'
            })
        }
    }
}
</script>
<style>
.account{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.account-head{
    background: linear-gradient(to bottom,#6dcaff,#419afc);
    padding: 0 .3rem;
    color: #fff;
}
.account-head p{
    text-align: right;
    line-height: 1rem;
}
.account-top{
    height: 0.9rem;
    position: relative;
}
.account-top b{
    line-height: .9rem;
    position: absolute;
    left: 0;
}
.account-top h1{
    line-height: .9rem;
    text-align: center;
    font-size: .32rem;
}
.account-money{
    font-size: .8rem;
    line-height: 1.6rem;
}
.account-list li{
    height: 1rem;
    padding: 0 .3rem;
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    background: #fff;
}
.account-list li span:nth-child(1){
    font-size: .5rem;
}
.account-list li b{
    float: right;
}
</style>
