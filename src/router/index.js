import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/home'
import Search from '../pages/search/search'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Detail from '../pages/detail/detail'

import First from '../pages/first/first'
import Classify from '../pages/classify/classify'
import Shopcar from '../pages/shopcar/shopcar'
import Mine from '../pages/mine/mine'
import {getCookie} from '../utils/utils'
import Address from '../pages/address/address'
import Addressnew from '../pages/address/addressnew'
import Account from '../pages/account/account'
import Topupway from '../pages/account/topupway'
import Bill from '../pages/account/bill'
import Setting from '../pages/setting/setting'

Vue.use(Router)

let router = new Router({
    mode:'history',
    routes: [
        {
            path:'/',
            redirect:'/home/first'
        },{
            path: '/home',
            name: 'home',
            component: Home,
            children:[
                {
                    path: 'first',
                    name: 'first',
                    component: First,
                },{
                    path: 'classify',
                    name: 'classify',
                    component: Classify,
                },{
                    path: 'shopcar',
                    name: 'shopcar',
                    component: Shopcar,
                },{
                    path: 'mine',
                    name: 'mine',
                    component: Mine,
                },
            ]
        },{
            path: '/search',
            name: 'search',
            component: Search,
        },{
            path: '/detail',
            name: 'detail',
            component: Detail,
        },{
            path: '/login',
            name: 'login',
            component: Login,
        },{
            path:'/register',
            name:'register',
            component:Register
        },{
            path:'/address',
            name:'address',
            component:Address
        },{
            path:'/addressnew',
            name:'addressnew',
            component:Addressnew
        },{
            path:'/account',
            name:'account',
            component:Account
        },{
            path:'/topupway',
            name:'topupway',
            component:Topupway
        },{
            path:'/bill',
            name:'bill',
            component:Bill
        },{
            path:'/setting',
            name:'setting',
            component:Setting
        }
    ]
})

router.beforeEach((to,from,next)=>{
    //console.log(to)
    if(to.name=="mine" || to.name=="shopcar"){
        let token = getCookie('token')
        if(!token){
            next({name:'login',query:{from:to.name}})
        }else{
            next()
        }
    }else{
        next()
    }
})
export default router
