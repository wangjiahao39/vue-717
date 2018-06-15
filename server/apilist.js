const fs = require('fs')
const path = require('path')
//定义接口
module.exports = function (app){
    //首页商品列表的接口
    const goodsPath = path.resolve(__dirname+'/goodslist')
    app.get('/api/index/recommend.action',(req,res)=>{
        //console.log(req.query)
        if(req.query>5){
            res.json({
                code:1000,
                msg:'没有更多数据了'
            })
        }else{
            let list = fs.readFileSync(goodsPath+`/list${req.query.page}.json`,'utf-8')
            setTimeout(()=>{
                res.json(list)
            },2000) 
        }
    })

    const queryApi = require('./queryApi')
    //分类接口
    app.get('/api/classify',(req,res)=>{
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
            res.end(data)
        })
    })

    //登录接口
    app.post('/api/user/login',(req,res)=>{
        console.log(req.headers)
        console.log(req.body)
        res.end('1')
    })
}
