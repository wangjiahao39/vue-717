<template>
    <div class="bill">
        <div class="bill-top">
            <b @click="beforeaccount">＜</b>
            <h1>账单</h1>
        </div>
        <div class="bill-list">
            您还没有账单记录
        </div>
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
.bill{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.bill-top{
    height: 0.9rem;
    background: #fff;
    position: relative;
    padding: 0 .3rem;
}
.bill-top b{
    line-height: .9rem;
    position: absolute;
}
.bill-top h1{
    line-height: .9rem;
    text-align: center;
    font-size: .32rem;
}
.bill-list{
    text-align: center;
}
</style>
