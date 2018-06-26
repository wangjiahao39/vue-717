<template>
    <div class="setting">
        <div class="setting-top">
            <b @click="befomine">＜</b>
            <h1>设置</h1>
        </div>
        <ul class="setting-list">
            <li>我的头像<span>></span></li>
            <li>用户名<span>路飞 ></span></li>
            <li>我的二维码<span>></span></li>
        </ul>
        <button class="setting-btn" @click="exitLogin">退出登录</button>
        <Toast/>
    </div>
</template>
<script>
import {delCookie} from '../../utils/utils'
export default {
    methods:{
        befomine(){
            this.$router.push({
                name:'mine'
            })
        },
        exitLogin(){
            if(confirm('您确定要退出吗?')){
                delCookie('token')
                this.$toastBus.$emit('toast','您已退出，即将返回首页')
                setTimeout(()=>{
                    this.$router.push({
                        name:'first'
                    })
                },2000)
            }
        }
    }
}
</script>
<style>
.setting{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.setting-top{
    height: 0.9rem;
    background: #f9f9f9;
    position: relative;
    padding: 0 .3rem;
}
.setting-top b{
    line-height: .9rem;
    position: absolute;
}
.setting-top h1{
    line-height: .9rem;
    text-align: center;
    font-size: .32rem;
}
.setting-list{
    margin-top: 10px;
}
.setting-list li{
    height: 1rem;
    background: #fff;
    line-height: 1rem;
    padding: 0 .3rem;
    border-bottom: 1px solid #ccc;
}
.setting-list span{
    float: right;
}
.setting-btn{
    width: 70%;
    height: .9rem;
    background: red;
    color: #fff;
    border: none;
    border-radius: .9rem;
    margin-left: 15%;
    margin-top: 15%;
    outline: none;
}
</style>
