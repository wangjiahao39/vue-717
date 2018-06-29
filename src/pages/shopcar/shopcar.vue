<template>
    <div class="shopcar">
		<div class='shop-head'>
			<h1>购物车</h1>
			<span class="bianji" @click="editFunc">{{edit}}</span>
		</div>
		<div class='main'>
			<div class="list" v-show="$store.state.shopList.length==0">
				你的购物车还是空的！
			</div>
			<Goodsitem v-on:update="fetchList" v-for="(val,index) in $store.state.shopList" :key="index" :data="val"></Goodsitem>
		</div>
		<div class="shop-bottom">
			<div class="bottomLeft">
				<span :class="checkedClass" @click="selectedAll"></span>
				<span>全选</span>
			</div>
			<div class="bottomRight">
				<div class="allPrice">
					<span>合计<b>${{total}}</b></span><br>
					<span>(运费：￥0)</span>
				</div>
				<div class="numPrice">
					<button @click="deleat">{{type}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {getCookie,bus} from '../../utils/utils.js'
import Goodsitem from './goodsitem.vue'
export default {
    data(){
        return{
			data:[],
			flag:false,
			list:{

			},
			total:0,
			type:'结算',
			edit:'编辑',
			newArr:[]
        }
	},
	computed:{
		checkedClass(){
			let str = 'iconfont '
			return this.flag?str+'icon-danxuankuangyixuanzhong':str+'icon-radiobt_1'
		}
	},
    created(){
		this.$store.dispatch('fetchShoplist')
	},
	mounted(){
		//从来都没有this.$on的写法
		bus.$on('goodsCheaked',(data)=>{
			//console.log(data)
			this.list[data.name] = data.price
			this.sumup()
		})
		bus.$on('newarr',(arr)=>{
			console.log(arr)
			this.newArr = arr
		})
	},
    methods:{
		fetchList(){
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
		sumup(){
			this.total =  Object.values(this.list).reduce((init,item)=>{
				return init+item
			},0)
		},
		selectedAll(){
			this.flag = !this.flag
			bus.$emit('selected-all',this.flag)
		},
		editFunc(){
			if(this.edit == '编辑'){
				this.type = '删除'
				this.edit = '完成'
			}else{
				this.type = '结算'
				this.edit = '编辑'
			}
		},
		deleat(){
			if(this.type == '结算'){
				//跳转支付平台
			}else{
				if(confirm('您确定要删除吗？')){
					this.$http.post('/api/shopcar/del',{
						token:getCookie('token'),
						goodsname:this.newArr
					}).then(res=>{
						console.log(res)
						this.$refs.toast.active(res.msg)
					})
				}
			}
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
