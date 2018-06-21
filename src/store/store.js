import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {httpInstance} from '../utils/request'
import router from '../router/index'
import {getCookie} from '../utils/utils'

let store = new Vuex.Store({
    state:{
        catagoryData: {

        },
        shopList:[]
    },
    mutations:{
        updateList(state,payload){
            let o = {...state.catagoryData};
            o[payload.id] = payload.data.secondLevelCategories;
            state.catagoryData = o;
        },
        updateShoplist(state,payload){
            state.shopList = payload
        }
    },
    actions:{
        fetchList({state,commit},cid){
            if(!state.catagoryData[cid]){
                    httpInstance.get(`/api/classify?cid=${cid}`).then(res => {
                    commit('updateList',{
                        id:cid,
                        data:res
                    })
                });
            }
        },
        fetchShoplist({commit}){
            httpInstance.post('/api/goodslist',{
				token:getCookie('token')
			}).then(res=>{
				if(res.code==0){
					if((confirm('登录超时，请重新登陆'))){
						router.push({
							name:'login',
							query:{
								from:'shopcar'
							}
						})
					}else{
						
					}
				}else{
					commit('updateShoplist',res.data)
				}
			})
        }
    },
    getters:{},
    modules:{}
})
store.subscribe(()=>{
    console.log(store.state.catagoryData)
})

export default store