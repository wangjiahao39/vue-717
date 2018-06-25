<template>
    <div class="order-all">
        <div class="all-list">
            <div class="all-name">
                <img src="../../assets/images/shop-img.jpg" alt="">
                <span>小鱼的店 ></span>
                <b>等待卖家发货</b>
            </div>
            <dl>
                <dt><img src="../../assets/images/shop-img.jpg" alt=""></dt>
                <dd>
                    <p>就开始得到速度肯定会就开始得到速度肯定会就开始得到速度肯定会</p>
                    <span>￥109.00</span><b>×1</b>
                </dd>
            </dl>
            <dl>
                <dt><img src="../../assets/images/shop-img.jpg" alt=""></dt>
                <dd>
                    <p>就开始得到速度肯定会就开始得到速度肯定会就开始得到速度肯定会</p>
                    <span>￥109.00</span><b>×1</b>
                </dd>
            </dl>
            <p class="all-p">合计：￥114.00（运费：￥5.00）</p>
            <p class="all-p"><button>提醒卖家发货</button><button>申请退款</button></p>
        </div>
        <div class="all-list">
            <div class="all-name">
                <img src="../../assets/images/shop-img.jpg" alt="">
                <span>小鱼的店 ></span>
                <b>已发货</b>
            </div>
            <dl>
                <dt><img src="../../assets/images/shop-img.jpg" alt=""></dt>
                <dd>
                    <p>就开始得到速度肯定会就开始得到速度肯定会就开始得到速度肯定会</p>
                    <span>￥109.00</span><b>×1</b>
                </dd>
            </dl>
            <dl>
                <dt><img src="../../assets/images/shop-img.jpg" alt=""></dt>
                <dd>
                    <p>就开始得到速度肯定会就开始得到速度肯定会就开始得到速度肯定会</p>
                    <span>￥109.00</span><b>×1</b>
                </dd>
            </dl>
            <p class="all-p">合计：￥114.00（运费：￥5.00）</p>
            <p class="all-p"><button>查看物流</button><button>申请退货</button><button>确认收货</button></p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.order-all{
    width: 100%;
    height: 100%;
}
.all-list{
    background: #fff;
    margin-bottom: 10px;
}
.all-name{
    line-height: 30px;
    border-bottom: 1px solid #eee;
}
.all-name img{
    width: 7%;
    border-radius: 50%;
    margin-left: 10px;
}
.all-name b{
    float: right;
    margin-right: 10px;
    font-weight: 400;
    color: red;
}
.all-list dl{
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 10px;
}
.all-list dl dt{
    flex: 1;
    border: 1px solid #eee;
}
.all-list dl dt img{
    width: 70%;
    margin-left: 15%;
    padding: 10px 0;
}
.all-list dl dd{
    flex: 2;
    padding-left: 10px;
}
.all-list dl dd span{
    line-height: 50px;
}
.all-list dl dd b{
    float: right;
    font-weight: 400;
    line-height: 50px;
}
.all-p{
    text-align: right;
    line-height: 30px;
    padding-right: 10px;
}
.all-p button{
    background: #fff;
    border: 1px solid #ccc;
    padding: 3px 5px;
    border-radius: 3px;
    margin-left: 10px;
    outline: none;
}
</style>
