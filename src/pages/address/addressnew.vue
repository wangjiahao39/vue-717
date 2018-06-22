<template>
    <div class="addressnew">
        <div class="addressnew-top">
            <b @click="beforeaddress">＜</b>
            <h1>收货人</h1>
        </div>
        <ul class="addressnew-list">
            <li><input type="text" placeholder="收货人姓名"></li>
            <li><input type="text" placeholder="手机号"></li>
            <li>
                <select name="" id="">
                    <option value="">北京</option>
                    <option value="">上海</option>
                    <option value="">广州</option>
                </select>
                <select name="" id="">
                    <option value="">北京</option>
                    <option value="">上海</option>
                    <option value="">广州</option>
                </select>
            </li>
            <li>
                <select name="" id="">
                    <option value="">海淀区</option>
                    <option value="">大兴区</option>
                    <option value="">朝阳区</option>
                    <option value="">通州区</option>
                    <option value="">房山区</option>
                </select>
            </li>
            <li><input type="text" placeholder="详细地址"></li>
        </ul>
        <button class="addressnew-btn">保存</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        beforeaddress(){
            this.$router.push({
                name:'address'
            })
        }
    }
}
</script>
<style>
.addressnew{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.addressnew-top{
    height: 0.9rem;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
}
.addressnew-top b{
    position: absolute;
    left: 10px;
    line-height: .9rem;
}
.addressnew-top h1{
    text-align: center;
    line-height: .9rem;
    font-size: .32rem;
}
.addressnew-list li{
    line-height: .8rem;
    background: #fff;
    margin: 10px 10px 0 10px;
}
.addressnew-list li input{
    width: 100%;
    line-height: .8rem;
    border: none;
    padding-left: 10px;
    box-sizing: border-box;
    outline: none;
}
.addressnew-list li:nth-child(3){
    display: flex;
}
.addressnew-list li:nth-child(3) select{
    flex: 1;
    margin: 10px 20px;
    box-sizing: border-box;
}
.addressnew-btn{
    width: 60%;
    height: 0.9rem;
    background: red;
    color: #fff;
    border: none;
    border-radius: .9rem;
    margin-left: 20%;
    margin-top: 20px;
}
</style>
