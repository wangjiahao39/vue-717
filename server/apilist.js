const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
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
            let token = jwt.sign(req.body, '1601E', { expiresIn: 60 })
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
                console.log(decoded)
                res.json({
                    msg: 'success',
                    code: 1
                })
            }
        })
    })
}
