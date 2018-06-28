<template>
    <div class="setting">
        <div class="setting-top">
            <b @click="befomine">＜</b>
            <h1>设置</h1>
        </div>
        <ul class="setting-list">
            <li>
                我的头像
                <span>></span>
                <span class="setting-img">
                    <img :src="url" alt="">
                    <input type="file" class="file-input" @change="fileimg">
                </span>
            </li>
            <li>
                用户名
                <span>></span>
                <span>路飞</span>
            </li>
            <li>
                我的二维码
                <span>></span>
            </li>
        </ul>
        <button class="setting-btn" @click="exitLogin">退出登录</button>
        <Toast/>
    </div>
</template>
<script>
import {delCookie,getCookie} from '../../utils/utils'
export default {
    data(){
        return {
            url:'src/assets/images/head.png'
        }
    },
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
        },
        fileimg(e){
            let fd = new FormData();
            fd.append('images',e.target.files[0])
            //console.log(fd)
            this.$http.post('/api/upload',fd).then(res=>{
                //console.log(res)
                this.url = res.url
            })
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
.setting-list li span{
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
    float: right;
}
.setting-img{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    position: relative;
}
.setting-img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
}
.file-input{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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
