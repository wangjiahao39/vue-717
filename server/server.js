const express = require('express')
const apilist = require('./apilist')
const bodyParser = require('body-parser')
let app = express();

app.use(bodyParser.json())

app.all('*',function(req,res,next){
    res.header({
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Access-Control-Allow-Headers':'Content-Type, Authorization'//支持多个请求头时，空格隔开
    })
    next()
})
apilist(app)

app.listen('3000',function(){
    console.log('server start at:3000')
})