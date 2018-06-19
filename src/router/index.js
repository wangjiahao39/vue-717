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
            path:'/Register',
            name:'register',
            component:Register
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
