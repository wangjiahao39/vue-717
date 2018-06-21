const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const root = path.resolve(__dirname)
console.log(jwt)
//定义接口
module.exports = function (app) {
    //首页商品列表的接口
    const goodsPath = path.resolve(__dirname + '/goodslist')
    app.get('/api/index/recommend.action', (req, res) => {
        //console.log(req.query)
        if (req.query.page * 1 > 5) {
            res.json({
                code: 1000,
                msg: '没有更多数据了'
            })
        } else {
            let list = fs.readFileSync(goodsPath + `/list${req.query.page}.json`, 'utf-8')
            setTimeout(() => {
                res.json(list)
            }, 2000)
        }
    })

    const queryApi = require('./queryApi')
    //分类接口
    app.get('/api/classify', (req, res) => {
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data => {
            res.end(data)
        })
    })

    //注册接口
    app.post('/api/user/register', (req, res) => {
        console.log(req.body)
        let userpath = path.resolve(__dirname + '/user')
        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'))
        console.log(userlist)
        if (userlist.some(element => {
            return element.username == req.body.username
        })) {
            res.json({
                msg: 'failed',
                imfo: '该用户已存在',
                code: 1
            })
            return
        }
        userlist.push(req.body)
        fs.writeFile(userpath + '/userlist.json', JSON.stringify(userlist), function (err) {
            if (err) {
                res.json({
                    msg: err,
                    code: 0
                })
            } else {
                res.json({
                    msg: 'success',
                    code: 1
                })
            }
        })
    })
    //登录接口
    app.post('/api/user/login', (req, res) => {
        let userpath = path.resolve(__dirname + '/user')
        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'))
        let flag = false;//用户名和密码都不匹配
        userlist.forEach(item => {
            if (item.username == req.body.username && item.password == req.body.password) {
                flag = true
            }
        })
        if (flag) {
            let token = jwt.sign(req.body, '1601E', { expiresIn: 60*60 })
            res.json({
                msg: 'success',
                code: 1,
                token
            })
        } else {
            res.json({
                msg: '用户名或者密码错误',
                code: 0
            })
        }
    })

    //购物车商品列表
    app.post('/api/goodslist', (req, res) => {
        jwt.verify(req.body.token, "1601E", function (err, decoded) {
            if (err) {
                res.json({
                    msg: err,
                    code: 0
                })
            } else {
                let goods = JSON.parse(fs.readFileSync(__dirname+'/shoplist/shoplist.json','utf-8'))
                res.json({
                    msg: 'success',
                    code: 1,
                    data:goods[decoded.username] || []
                })
            }
        })
    })
    //添加购物车
    app.post('/api/addCar',(req,res)=>{
        if(!req.body.token){
            res.json({
                msg:'参数错误，必传字段，token缺失',
                code:2
            })
            return
        }
        jwt.verify(req.body.token,'1601E',(err,decoded)=>{
            if(err){
                res.json({
                    msg:'登录超时，请重新登陆',
                    code:'0'
                })
            }else{
                const carpath = __dirname+'/shoplist/shoplist.json'
                let shoplist = JSON.parse(fs.readFileSync(carpath,'utf-8'))
                if(shoplist[decoded.username]){
                    let flag = false;//判断商品是否存在
                    shoplist[decoded.username].forEach((item,index)=>{
                        if(item.wname==req.body.data.wname){
                            ++item.count
                            flag = true
                        }
                    })
                    if(!flag){
                        let o = {
                            ...req.body.data,
                            count:1
                        }
                        shoplist[decoded.username].push(o)
                    }
                }else{
                    shoplist[decoded.username] = [{count:1,...req.body.data}];
                }
                fs.writeFile(carpath,JSON.stringify(shoplist),(err)=>{
                    if(err){
                        res.json({
                            msg:'写入错误',
                            code:'0'
                        })
                    }else{
                        res.json({
                            msg:'添加成功',
                            code:1
                        })
                    }
                })
            }
        })
    })
    //删除购物车
    app.post('/api/shopcar/del',(req,res)=>{
        if(!req.body.token){
            res.status(304)
            res.json({
                msg:'参数错误，必传字段，token缺失',
                code:2
            })
            return
        }
        jwt.verify(req.body.token,'1601E',(err,decoded)=>{
            if(err){
                res.json({
                    msg:'登录超时，请重新登陆',
                    code:'0'
                })
            }else{
                const carpath = __dirname+'/shoplist/shoplist.json'
                let shoplist = JSON.parse(fs.readFileSync(carpath,'utf-8'))
                let goodslist = shoplist[decoded.username]
                //操作数据库
                let delindex = []
                goodslist = goodslist.forEach((item,index)=>{
                    req.body.goodsname.forEach((v,i)=>{
                        if(item.wname == v){
                            delindex.push(index)
                        }
                    })
                })
                for(let i=0;i<goodslist.length;i++){
                    for(let j=0;j<delindex.length;j++){
                        if(i==delindex[j]){
                            goodslist.splice(i,1);
                        }
                    }
                }
                goodslist.splice(delindex,1)
                shoplist[decoded.username] = goodslist
                
                fs.writeFile(carpath,JSON.stringify(shoplist),(err)=>{
                    if(err){
                        res.json({
                            msg:'写入错误',
                            code:'0'
                        })
                    }else{
                        res.json({
                            msg:'删除成功',
                            code:1
                        })
                    }
                })
            }
        })
    })
    //修改购物车数量
    app.post('/api/shopcar/count',(req,res)=>{
        if(!req.body.token){
            res.status(304)
            res.json({
                msg:'参数错误，必传字段，token缺失',
                code:2
            })
            return
        }
        jwt.verify(req.body.token,'1601E',(err,decoded)=>{
            if(err){
                res.json({
                    msg:'登录超时，请重新登陆',
                    code:'0'
                })
            }else{
                const carpath = __dirname+'/shoplist/shoplist.json'
                let shoplist = JSON.parse(fs.readFileSync(carpath,'utf-8'))
                let goodslist = shoplist[decoded.username]
                //操作数据库
                goodslist = goodslist.map((item,index)=>{
                    if(item.wname == req.body.goodsname){
                        item.count = req.body.count
                    }
                    return item
                })
                shoplist[decoded.username] = goodslist
                
                fs.writeFile(carpath,JSON.stringify(shoplist),(err)=>{
                    if(err){
                        res.json({
                            msg:'写入错误',
                            code:'0'
                        })
                    }else{
                        res.json({
                            msg:'修改成功',
                            code:1
                        })
                    }
                })
            }
        })
    })
}
