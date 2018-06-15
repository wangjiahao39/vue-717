import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {httpInstance} from '../utils/request'

let store = new Vuex.Store({
    state:{
        catagoryData: {

        }
    },
    mutations:{
        updateList(state,payload){
            let o = {...state.catagoryData};
            o[payload.id] = payload.data.secondLevelCategories;
            state.catagoryData = o;
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
        }
    },
    getters:{},
    modules:{}
})
store.subscribe(()=>{
    console.log(store.state.catagoryData)
})

export default store