<template>
    <div class="first">
        <div class="first-top">
            <img src="../../assets/images/logo.gif" alt="">
            <input type="text" @click="gotoSearch" placeholder="输入您需要买的商品">
            <dl>
                <dt><img src="../../assets/images/shop.png" alt=""></dt>
                <dd>我的店铺</dd>
            </dl>
            <dl>
                <dt><img src="../../assets/images/shop.png" alt=""></dt>
                <dd>消息</dd>
            </dl>
        </div>
        <div class="first-wrap" @scroll="onScrollFn" ref="wrap">
            <div class="banner" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../assets/images/banner3.png" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/banner2.png" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/banner3.png" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/banner2.png" alt=""></div>
                </div>
            </div>
            <div class="first-list">
                <dl>
                    <dt><span class="iconfont icon-canyin"></span></dt>
                    <dd>家乡味道</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-zhusu"></span></dt>
                    <dd>进口食品</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-canting"></span></dt>
                    <dd>牛奶乳品</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-dianping"></span></dt>
                    <dd>茶果冲饮</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-feiji"></span></dt>
                    <dd>休闲零食</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-haitan"></span></dt>
                    <dd>米面粮油</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-jichengche"></span></dt>
                    <dd>调味调料</dd>
                </dl>
                <dl>
                    <dt><span class="iconfont icon-shizhong"></span></dt>
                    <dd>酒水饮料</dd>
                </dl>
            </div>
            <ul class="first-content" ref="list">
                <li v-for="(item,index) in list" :key="index">
                    <GoodsItem :data='item' :instance="$refs.addCartSuc"></GoodsItem>
                </li>
            </ul>
            <p class="tipss">{{tipss}}</p>
        </div>
        <Toast ref="addCartSuc"></Toast>
    </div>
</template>
<script>
import Swiper from 'swiper'
import GoodsItem from '../../components/goodsItem/goodsItem.vue'
import 'swiper/dist/css/swiper.css'
import jsonp from '../../utils/jsonp'
export default {
    data(){
        return {
            url:'https://h5api.m.taobao.com/h5/mtop.taobao.wireless.guess.get/1.0/?jsv=2.4.11&appKey=12574478&t=1528851613901&sign=d1f16bff379c4744a8dc93aa68a12b57&api=mtop.taobao.wireless.guess.get&v=1.0&type=jsonp&dataType=jsonp&callback=mtopjsonp2&data=%7B%22userId%22%3A%220%22%2C%22platformVersion%22%3A%2214%22%2C%22channel%22%3A%22homePage%22%2C%22fromLocation%22%3A%22unknown%22%2C%22extendMap%22%3A%22%7B%5C%22h5_platform%5C%22%3A%5C%22h5%5C%22%2C%5C%22h5_ttid%5C%22%3A%5C%2260000%40taobao_h5_1.0.0%5C%22%7D%22%7D',
            list:[],
            canIQuery:true,
            page:1,
            tipss:'正在加载数据...'
        }
    },
    methods:{
        gotoSearch(){
            this.$router.push({
                name:'search'
            })
        },
        onScrollFn(){
            let winH = this.$refs.wrap.offsetHeight;
            let docH = this.$refs.list.offsetHeight;+this.$refs.swiper.offsetHeight;
            let scrollH = this.$refs.wrap.scrollTop;
            if(docH-winH-scrollH<30 && this.canIQuery){
                this.page++;
                this.canIQuery = false;
                this.$http(`/api/index/recommend.action?page=${this.page}`).then(res=>{
                    if(res.code===1000){
                        this.tipss = '我是有底线的'
                    }else{
                        this.list = [...this.list,...JSON.parse(JSON.parse(res).recommend).wareInfoList];
                    }
                    this.canIQuery = true;
                })
            }
        }
    },
    components:{
        GoodsItem
    },
    mounted(){
        new Swiper(this.$refs.swiper,{
            autoplay:true,
            loop:true
        });
        this.$http(`/api/index/recommend.action?page=${this.page}`).then(res=>{
            this.list = JSON.parse(JSON.parse(res).recommend).wareInfoList
        });
        // this.$http.post(`/api/user/login`,{
        //     name:'jacky'
        // }).then(res=>{
            
        // })
        // jsonp(this.url,'mtopjsonp2').then((res)=>{
        //     console.log(res.data)
        //     this.data = res.data
        // })
    }
}
</script>
<style>
.first{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.first-top{
    width: 100%;
    height: .88rem;
    display: flex;
}
.first-top img{
    width: 15%;
    height: 0.6rem;
    margin-top: .15rem;
    padding: 0 3%;
}
.first-top input{
    width: 45%;
    height: 0.6rem;
    margin-top: .15rem;
    background: #eee;
    border: none;
}
.first-top dl{
    width: 17%;
    font-size: 12px;
    text-align: center;
    color: red;
}
.first-top dl img{
    width: 30%;
    height: .3rem;;
}
.first-wrap{
    flex: 1;
    overflow: auto;
}
.banner{
    width: 100%;
    height: 3.6rem;
    overflow-x: hidden;
    font-size: 0;
}
.banner img{
    width: 100%;
}
.first-list{
    width: 100%;
    margin-bottom: 10px;
}
.first-list dl{
    display: inline-block;
    width: 24%;
    text-align: center;
    font-size: 12px;
    padding: .1rem 0;
}
.first-list dl dt span{
    display: inline-block;
    width: .9rem;
    height: .9rem;
    background: skyblue;
    text-align: center;
    line-height: .9rem;
    border-radius: 50%;
    color: #fff;
    margin-bottom: .1rem;
}
.first-content{
    width: 100%;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
}
.first-content li{
    width: 50%;
    display: inline-block;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}
.first-content li:nth-of-type(2n+1){
    border-right: 1px solid #ccc;
}
.tipss{
    text-align: center;
}
</style>
