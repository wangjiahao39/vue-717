<template>
    <div class="classify">
        <div class="classify-top">
            <input type="text" @click="gotoSearch" placeholder="输入您要购买的商品">
            <i class="iconfont icon-xiaoxizhongxin"></i>
        </div>
        <div class="classify-count">
            <div class="aside">
                <p @click="getData($event)" :class="code==17951827?'bg':''" data-id="17951827">热门分类</p>
                <p @click="getData($event)" :class="code==17951828?'bg':''" data-id="17951828">手机数码</p>
                <p @click="getData($event)" :class="code==17951829?'bg':''" data-id="17951829">电脑办公</p>
                <p @click="getData($event)" :class="code==17951830?'bg':''" data-id="17951830">电视影音</p>
                <p @click="getData($event)" :class="code==17951831?'bg':''" data-id="17951831">空调冰洗</p>
                <p @click="getData($event)" :class="code==17951832?'bg':''" data-id="17951832">厨房卫浴</p>
                <p @click="getData($event)" :class="code==17951833?'bg':''" data-id="17951833">生活电器</p>
                <p @click="getData($event)" :class="code==17951834?'bg':''" data-id="17951834">食品酒水</p>
                <p @click="getData($event)" :class="code==17951835?'bg':''" data-id="17951835">美妆个护</p>
                <p @click="getData($event)" :class="code==17951836?'bg':''" data-id="17951836">母婴玩具</p>
                <p @click="getData($event)" :class="code==17951837?'bg':''" data-id="17951837">医疗保健</p>
                <p @click="getData($event)" :class="code==17951838?'bg':''" data-id="17951838">服饰鞋帽</p>
                <p @click="getData($event)" :class="code==17951839?'bg':''" data-id="17951839">运动户外</p>
                <p @click="getData($event)" :class="code==17951840?'bg':''" data-id="17951840">箱包奢品</p>
                <p @click="getData($event)" :class="code==17951841?'bg':''" data-id="17951841">钟表首饰</p>
                <p @click="getData($event)" :class="code==17951842?'bg':''" data-id="17951842">住宅家具</p>
                <p @click="getData($event)" :class="code==17951843?'bg':''" data-id="17951843">家装建材</p>
                <p @click="getData($event)" :class="code==17951844?'bg':''" data-id="17951844">家居日用</p>
                <p @click="getData($event)" :class="code==17951845?'bg':''" data-id="17951845">床品家纺</p>
                <p @click="getData($event)" :class="code==17951846?'bg':''" data-id="17951846">汽车用品</p>
                <p @click="getData($event)" :class="code==17951847?'bg':''" data-id="17951847">黄金收藏</p>
                <p @click="getData($event)" :class="code==17951849?'bg':''" data-id="17951849">智能家居</p>
                <p @click="getData($event)" :class="code==17951850?'bg':''" data-id="17951850">金融理财</p>
                <p @click="getData($event)" :class="code==17951851?'bg':''" data-id="17951851">生活服务</p>
            </div>
            <div class="right">
                <div v-for="(item,index) in shoplist" :key="index">
                    <div class="floor">
                        <p class="title">{{item.goodsTypeName}}</p>
                        <dl v-for="(v,i) in item.goodsTypeList" :key="i">
                            <dt><img :src="v.goodsTypeImgUrl" alt=""></dt>
                            <dd>{{v.goodsTypeName}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            code:17951827
        };
    },
    computed:{
        shoplist(){
            return this.catagoryData[this.code]
        },
        ...mapState(['catagoryData'])
    },
    methods: {
        getData(e) {
            let id = e.target.getAttribute('data-id')
            this.code = id
            this.$store.dispatch('fetchList',id)
        },
        gotoSearch(){
            this.$router.push({
                name:'search'
            })
        }
    },
    mounted() {
        
    }
};
</script>
<style>
.classify {
    display: flex;
    flex-direction: column;
}
.classify-top {
    width: 100%;
    height: 0.88rem;
    border-bottom: 1px solid #eee;
}
.classify-top input {
    width: 70%;
    height: 0.6rem;
    border: none;
    background: #eee;
    margin-left: 12%;
    margin-top: 0.15rem;
    border-radius: 3px;
    text-align: center;
}
.classify-top i {
    display: inline-block;
    font-size: 20px;
    width: 15%;
    text-align: center;
}
.classify-count {
    flex: 1;
    overflow: auto;
    display: flex;
}
.aside {
    width: 25%;
    height: 100%;
    background: #eee;
    overflow: auto;
}
.aside p{
    line-height: 38px;
    text-align: center;
}
.right {
    width: 75%;
    height: 100%;
    overflow: auto;
}
.title {
    line-height: 30px;
    padding-left: 2.5%;
}
.floor dl {
    width: 30%;
    background: #eee;
    display: inline-block;
    text-align: center;
    margin-left: 2.5%;
    padding: 10px 0;
    margin-bottom: 6px;
}
.floor dl img {
    width: 70%;
}
.floor dl dd {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
}
.bg{
    border-left: 2px solid red;
    background: #fff;
}
</style>
