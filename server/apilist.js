const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname + '/upload'))
    },
    filename: function (req, file, cb) {
        console.log(file)
        let n = file.originalname.split('.')
        cb(null, n[0] + '-' + Date.now() + '.' + n[1])
    }
})
const upload = multer({ storage: storage })
//console.log(jwt)
//定义接口
module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('index', { title: 'HTML' })
    })

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
        //console.log(req.body)
        let userpath = path.resolve(__dirname + '/user')
        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'))
        //console.log(userlist)
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
            let token = jwt.sign(req.body, '1601E', { expiresIn: 60 * 60 })
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
                let goods = JSON.parse(fs.readFileSync(__dirname + '/shoplist/shoplist.json', 'utf-8'))
                res.json({
                    msg: 'success',
                    code: 1,
                    data: goods[decoded.username] || []
                })
            }
        })
    })

    //添加购物车
    app.post('/api/addCar', (req, res) => {
        if (!req.body.token) {
            res.json({
                msg: '参数错误，必传字段，token缺失',
                code: 2
            })
            return
        }
        jwt.verify(req.body.token, '1601E', (err, decoded) => {
            if (err) {
                res.json({
                    msg: '登录超时，请重新登陆',
                    code: '0'
                })
            } else {
                const carpath = __dirname + '/shoplist/shoplist.json'
                let shoplist = JSON.parse(fs.readFileSync(carpath, 'utf-8'))
                if (shoplist[decoded.username]) {
                    let flag = false;//判断商品是否存在
                    shoplist[decoded.username].forEach((item, index) => {
                        if (item.wname == req.body.data.wname) {
                            ++item.count
                            flag = true
                        }
                    })
                    if (!flag) {
                        let o = {
                            ...req.body.data,
                            count: 1
                        }
                        shoplist[decoded.username].push(o)
                    }
                } else {
                    shoplist[decoded.username] = [{ count: 1, ...req.body.data }];
                }
                fs.writeFile(carpath, JSON.stringify(shoplist), (err) => {
                    if (err) {
                        res.json({
                            msg: '写入错误',
                            code: '0'
                        })
                    } else {
                        res.json({
                            msg: '添加成功',
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //删除购物车
    app.post('/api/shopcar/del', (req, res) => {
        let {goodsname} = req.body
        const carpath = __dirname + '/shoplist/shoplist.json'
        let shoplist = JSON.parse(fs.readFileSync(carpath, 'utf-8'))
        //let goodslist = shoplist[decoded.username]
        //console.log(shoplist)
        let al = []
        al.push(shoplist)

        jwt.verify(req.body.token, '1601E', (err, decoded) => {
            if (err) {
                res.json({
                    msg: '登录超时，请重新登陆',
                    code: '0'
                })
            } else {
                //操作数据库
                let delindex = []
                al.forEach((item, index) => {
                    //console.log(item)
                    if(item[decoded.username]){
                        item[decoded.username].forEach((v, i) => {
                            //console.log(v)
                            if (goodsname.indexOf(v.wareId) === -1) {
                                delindex.push(v)
                            }
                        })
                        item[decoded.username] = delindex
                    }
                })
                fs.writeFile(carpath, JSON.stringify(shoplist), (err) => {
                    if (err) {
                        res.json({
                            msg: '写入错误',
                            code: '0'
                        })
                    } else {
                        res.json({
                            msg: '删除成功',
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //修改购物车数量
    app.post('/api/shopcar/count', (req, res) => {
        if (!req.body.token) {
            res.status(304)
            res.json({
                msg: '参数错误，必传字段，token缺失',
                code: 2
            })
            return
        }
        jwt.verify(req.body.token, '1601E', (err, decoded) => {
            if (err) {
                res.json({
                    msg: '登录超时，请重新登陆',
                    code: '0'
                })
            } else {
                const carpath = __dirname + '/shoplist/shoplist.json'
                let shoplist = JSON.parse(fs.readFileSync(carpath, 'utf-8'))
                let goodslist = shoplist[decoded.username]
                //操作数据库
                goodslist = goodslist.map((item, index) => {
                    if (item.wname == req.body.goodsname) {
                        item.count = req.body.count
                    }
                    return item
                })
                shoplist[decoded.username] = goodslist

                fs.writeFile(carpath, JSON.stringify(shoplist), (err) => {
                    if (err) {
                        res.json({
                            msg: '写入错误',
                            code: '0'
                        })
                    } else {
                        res.json({
                            msg: '修改成功',
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //添加收货地址
    app.post('/api/addressnew', (req, res) => {
        //console.log(req.body)
        let addrlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'addr/addr.json'), 'utf-8'))
        jwt.verify(req.body.token, '1601E', (err, decoded) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: '登录超时，请重新登陆'
                })
            } else {
                if (addrlist[decoded.username]) {
                    addrlist[decoded.username].push(req.body.data)
                } else {
                    addrlist[decoded.username] = [req.body.data]
                }
                fs.writeFile(path.resolve(__dirname, 'addr/addr.json'), JSON.stringify(addrlist), function (error) {
                    if (error) {
                        res.json({
                            code: 0,
                            msg: '服务器报错，请重新尝试',
                            data: error
                        })
                    } else {
                        res.json({
                            code: 1,
                            msg: '添加成功'
                        })
                    }
                })
            }
        })
    })

    //获取收货地址列表
    app.post('/api/addrlist', (req, res) => {
        let addrlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'addr/addr.json'), 'utf-8'))
        jwt.verify(req.body.token, '1601E', (err, decoded) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: '登录超时，请重新登陆'
                })
            } else {
                res.json({
                    code: 1,
                    msg: '请求成功',
                    data: addrlist[decoded.username]
                })
            }
        })
    })

    //文件上传接口
    app.post('/api/upload', upload.single('images'), (req, res) => {
        console.log(req.file)
        res.json({
            code: 0,
            msg: 'success',
            url: 'http://localhost:3000/server/upload/' + req.file.filename
        })
    })
}
