<template>
    <div class="box">
        <router-view class="content"></router-view>
        <div class="footer">
            <router-link :to="{name:'first'}">
                <dl>
                    <dt><i class="iconfont icon-shouye"></i></dt>
                    <dd>首页</dd>
                </dl>
            </router-link>
            <router-link :to="{name:'classify'}">
                <dl>
                    <dt><i class="iconfont icon-fenlei"></i></dt>
                    <dd>分类</dd>
                </dl>
            </router-link>
            <router-link :to="{name:'shopcar'}">
                <dl>
                    <dt><i class="iconfont icon-caigou-xianxing"></i></dt>
                    <dd>购物车</dd>
                </dl>
            </router-link>
            <router-link :to="{name:'mine'}">
                <dl>
                    <dt><i class="iconfont icon-wode"></i></dt>
                    <dd>我的</dd>
                </dl>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.content{
    flex: 1;
}
.footer{
    height: 1rem;
    display: flex;
    border-top: 1px solid #f1f1f1;
    box-sizing: border-box;
}
.footer a{
    flex: 1;
    text-align: center;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
}
.router-link-exact-active{
    color: red;
}
</style>
