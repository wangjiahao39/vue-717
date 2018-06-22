<template>
    <div class="address">
        <div class="address-top">
            <b @click="beforemine">＜</b>
            <h1>地址管理</h1>
        </div>
        <div class="address-list">
            <h3>路飞 130****8036</h3>
            <p>北京市海淀区知春路北京市海淀区知春路北京市海淀区知春路</p>
            <dl>
                <dt>
                    <span :class="checkedClass" @click="check"></span>
                    <span>{{txt}}</span>
                </dt>
                <dd>
                    <span>编辑</span>
                    <span>删除</span>
                </dd>
            </dl>
        </div>
        <button class="address-add" @click="gotoaddressnew">+新增地址</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            flag:false,
            txt:'设为默认'
        }
    },
    computed:{
        checkedClass(){
            let str = 'iconfont '
            return this.flag?str+'icon-danxuankuangyixuanzhong':str+'icon-radiobt_1'
        }
    },
    methods:{
        beforemine(){
            this.$router.push({
                name:'mine'
            })
        },
        gotoaddressnew(){
            this.$router.push({
                name:'addressnew'
            })
        },
        check(){
            this.flag = !this.flag
            if(this.flag){
                this.txt = '默认地址'
            }else{
                this.txt = '设为默认'
            }
        }
    }
}
</script>
<style>
.address{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    position: relative;
}
.address-add{
    width: 60%;
    height: 0.9rem;
    background: red;
    color: #fff;
    border: none;
    border-radius: .9rem;
    position: absolute;
    bottom: 5%;
    left: 20%;
}
.address-top{
    height: 0.9rem;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
}
.address-top b{
    position: absolute;
    left: 10px;
    line-height: .9rem;
}
.address-top h1{
    text-align: center;
    line-height: .9rem;
    font-size: .32rem;
}
.address-list{
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
}
.address-list h3{
    line-height: .6rem;
}
.address-list dl{
    height: 0.8rem;
    display: flex;
    border-top: 1px solid #eee;
    margin-top: 5px;
}
.address-list dl dt{
    flex: 1;
}
.address-list dl dt span{
    line-height: .8rem;
}
.address-list dl dd{
    flex: 1;
    text-align: right;
}
.address-list dl dd span{
    display: inline-block;
    width: 30%;
    line-height: .8rem;
}
</style>
