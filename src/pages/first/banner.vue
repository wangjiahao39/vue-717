<template>
    <div class="text_banner">
        <h3>商城动态</h3>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- 这部分放你要渲染的那些内容 -->
            <swiper-slide v-for="(item,index) in items" :key="index">
                <p style="font-size:12px">{{item.tit}}</p>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
    name: "swipe1",
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            items: [
                {
                    tit:"水电费和大家离开对方开具临时管理开发带来看电视剧是的范德萨发给"
                },
                {
                    tit:"吗的撒谎覅杜甫回来的克里斯多家分店发来反馈结果的的闪光点"
                },
                { 
                    tit: "时间哦对了几个空间发的水电费后的洛凯股份重复订购" 
                }
            ],
            swiperOption: {
                notNextTick: true, //第一时间获取swiper对象
                slidesPerView: "auto",
                loop: true, //无缝轮播
                autoplayDisableOnteraction: true, //和loop联合形成无缝轮播
                autoplay: 2500, //轮播时间
                direction: "vertical", //水平  horizontal 垂直 vertical
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 15,
                onSlideChangeEnd: swiper => {
                    //这个位置放swiper的回调方法
                    this.page = swiper.realIndex + 1;
                    this.index = swiper.realIndex;
                }
                //paginationType:"bullets" 分页器样式
            }
        };
    }
};
</script>
<style>
.text_banner {
    width: 100%;
    height: 1rem;
    background: #fff;
    padding: 0 0.15rem;
    box-sizing: border-box;
}
.text_banner h3 {
    width: 10%;
    font-size: 12px;
    float: left;
    color: #ff6d00;
    border-right: 1px solid #ccc;
}
.text_banner .swiper-container {
    margin-left: 5%;
    width: 80%;
    height: 100%;
    float: left;
    line-height: 0.4rem;
}
</style>
