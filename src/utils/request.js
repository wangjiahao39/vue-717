import Vue from 'vue'
import axios from 'axios'

console.log(process.env.NODE_ENV)
//测试服务器
const testUrl = 'http://localhost:3000'
//线上服务器
const onlineUrl = 'http:m.jd.com'
let httpInstance = axios.create({
    headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/json',
        'Authorization':'123'
    },
    baseURL:process.env.NODE_ENV==='development'?testUrl:onlineUrl
})
httpInstance.interceptors.request.use((config)=>{
    // console.log(config)
    // if(config.url.indexOf('mine')>-1){
    //     config.headers.Authorization = '123'
    // }
    return config
},(err)=>{
    console.log(err)
})

httpInstance.interceptors.response.use((response)=>{
    if(response.status === 200){
        return response.data
    }else{
        return response
    }
})

export {httpInstance}
export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,'$http',{
            value:httpInstance
        })
    }
}