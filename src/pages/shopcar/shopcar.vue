<template>
    <div class="shopcar">
		<div class='shop-head'>
			<h1>购物车</h1>
			<span class="bianji">编辑</span>
		</div>
		<div class='main'>
			<div class="list" v-show="data.length==0">
				你的购物车还是空的！
			</div>
			<Goodsitem v-for="(val,index) in data" :key="index" :data="val"></Goodsitem>
		</div>
		<div class="shop-bottom">
			<div class="bottomLeft">
				<input type="checkbox">
				<span>全选</span>
			</div>
			<div class="bottomRight">
				<div class="allPrice">
					<span>合计<b>$0</b></span><br>
					<span>(运费：￥0)</span>
				</div>
				<div class="numPrice">
					<button>结算</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {getCookie} from '../../utils/utils.js'
import Goodsitem from './goodsitem.vue'
export default {
    data(){
        return{
            data:[],
            count:1
        }
    },
    created(){
        //请求购物车列表
        this.$http.post('/api/goodslist',{
            token:getCookie('token')
        }).then(res=>{
            if(res.code==0){
                if((confirm('登录超时，请重新登陆'))){
                    this.$router.push({
                        name:'login',
                        query:{
                            from:'shopcar'
                        }
                    })
                }else{
                    
                }
            }else{
                this.data = res.data
            }
        })
    },
    methods:{
        decrement(){
            this.count--;
        }
    },
    components:{
        Goodsitem
    }
}
</script>
<style>
.shopcar{
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	background-color: #eeeeee;
}
.shop-head{
	width: 100%;
	height: .97rem;
	background-color:#fafafb;
	border-bottom: .01rem solid #ccc;
	position: relative;
}
.shop-head h1{
    text-align: center;
    line-height: .97rem;
}
.shop-head span{
    position: absolute;
    right: 10px;
    top: 0;
    line-height: .97rem;
}
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
}
span{
	color:#464646;
} 
.bianji{
	margin-right: 0.3rem;
}
.shop{
	position: absolute;
	left: 50%;
	transform: translatex(-50%);
}
.list{
	width: 100%;
	height:2.65rem;
	display:flex;
	margin-bottom:.2rem;
	background-color:#fff;
	align-items:center;
	justify-content:space-around;
}
.list img{
	width: 2rem;
}
.listRight{
	width: 4.2rem;
	height: 2rem;
	display:flex;
	flex-direction:column;
	justify-content:space-around;
}
.listRight b{
	color:red;
}
.listRight span{
	display:inline-block;
	height: .6rem;
	width: .6rem;
	border: .01rem solid #ccc;
	text-align: center;
	line-height: .6rem;
}
.shop-bottom{
	width: 100%;
	height: .97rem;
	background-color:#fff;
	display:flex;
	justify-content:space-around;
	align-items:center;
}
.bottomLeft{
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
}
.bottomRight{
    flex: 2;
	align-items:center;
    display: flex;
}
.allPrice{
	flex: 1;
	flex-direction:column;
	margin-right: .3rem;
}
.numPrice{
    flex: 1;
}
.numPrice button{
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background-color:#fc4141;
	color:#fff;
	text-align: center;
	line-height: .9rem;
}
.text{
	overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
