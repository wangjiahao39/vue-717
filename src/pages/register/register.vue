<template>
    <div class="register">
        <h2>注册717<span>登录</span></h2>
        <p><label for="username">用户名</label><input type="text" id="username" v-model="username" placeholder="请输入手机号"></p>
        <p><label for="password">密码</label><input type="password" v-model="password" placeholder="请输入4位以上的字符串"></p>
        <p><label for="password">确认密码</label><input type="password" v-model="passwords" placeholder="再次输入密码"></p>
        <button @click="goToRegister">注册</button>
    </div>
</template>
<script>
import {required} from 'vuelidate'
export default {
    data(){
        return {
            username:'',
            password:'',
            passwords:''
        }
    },
    methods:{
        goToRegister(){
            let regPhone = /^1[3578]\d{9}$/;
            if(!regPhone.test(this.username)){
                alert('手机号输入错误')
                return
            }
            let regPassword = /\d{6,}/
            if(!regPassword.test(this.password)){
                alert('密码格式输入错误')
                return
            }
            if(this.password!==this.passwords){
                alert('与上次密码不符')
                return
            }
            if(!this.username || !this.password || !this.passwords){
                alert('信息不能为空')
                return
            }
            
            this.$http.post('/api/user/register',{
                username:this.username,
                password:this.password
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$router.push({
                        name:'login'
                    })
                }
            })
        }
    }
}
</script>
<style>
.register{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
}
.register h2{
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    position: relative;
    margin-bottom: 5px;
}
.register h2 span{
    position: absolute;
    right: 10px;
}
.register p{
    padding: 10px 20px;
    background: #fff;
    border-bottom: 1px solid #ccc;
}
.register p label{
    display: inline-block;
    width: 20%;
}
.register p input{
    height: 25px;
    border: none;
    outline: none;
}
.register button{
    width: 70%;
    height: 35px;
    border: none;
    background: rgb(247, 49, 49);
    color: #fff;
    border-radius: 20px;
    margin-left: 15%;
    margin-top: 15px;
    outline: none;
}
</style>
