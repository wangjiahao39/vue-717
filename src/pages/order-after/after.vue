<template>
    <div class="after">
        <div class="after-header">
            <span @click="before">＜</span>
            <h1>我的717商城</h1>
            <i class="iconfont icon-xiaoxi"></i>
        </div>
        <div class="after-content">
            <p>退款类型</p>
            <span>退款(无需退货)</span>
            <span>退货</span>
            <p>退款原因</p>
            <span>
                <select name="" id="">
                    <option value="">请选择退款类型</option>
                    <option value="">没收到货</option>
                    <option value="">拍错商品</option>
                    <option value="">包装商品破损</option>
                    <option value="">未按约定时间发货</option>
                    <option value="">其他原因</option>
                </select>
            </span>
            <p>退款金额</p>
            <span>
                <input type="text" placeholder="请输入退款金额">
            </span>
            <p>退款说明(可不填)</p>
            <span>
                <input type="text" placeholder="请输入退款说明">
            </span>
            <button class="after-up">提交申请</button>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        before(){
            this.$router.push({
                name:'order-after'
            })
        }
    }
}
</script>
<style>
.after{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.after-header{
    height: 0.9rem;
    background: #fff;
    position: relative;
}
.after-header span{
    display: inline-block;
    width: 10%;
    position: absolute;
    line-height: 0.9rem;
    left: 12px;
    font-size: .40rem;
}
.after-header h1{
    text-align: center;
    font-size: .32rem;
    line-height: 0.9rem;
}
.after-header i{
    display: inline-block;
    width: 10%;
    text-align: center;
    position: absolute;
    line-height: 0.9rem;
    right: 12px;
    top: 0;
    font-size: .40rem;
    z-index: 2;
}
.after-content{
    padding: 0 12px;
}
.after-content p{
    font-weight: 600;
    line-height: 35px;
}
.after-content span{
    display: inline-block;
    width: 100%;
    background: #fff;
    line-height: 44px;
    padding: 0 10px;
    box-sizing: border-box;
}
.after-content span:nth-child(2){
    border-bottom: 1px solid #eee;
}
.after-content span select{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}
.after-content span input{
    width: 100%;
    line-height: 30px;
    border: none;
    outline: none;
}
.after-up{
    width: 70%;
    height: 43px;
    background: red;
    color: #fff;
    border-radius: 43px;
    border: none;
    margin-left: 15%;
    margin-top: 15px;
    outline: none;
}
</style>
