<template>
    <div class="address">
        <div class="address-top">
            <b @click="beforemine">＜</b>
            <h1>地址管理</h1>
        </div>
        <div class="address-main">
            <div class="address-no" v-show="data.length==0">
                <h2>您还没有添加地址</h2>
            </div>
            <div class="address-list" v-for="(item,index) in data" :key="index">
                <h3>{{item.name}}<span>{{item.phone}}</span></h3>
                <p>{{item.province}}{{item.city}}{{item.area}}</p>
                <dl>
                    <dt>
                        <span :class="checkedClass" @click="check"></span>
                        <span>{{txt}}</span>
                    </dt>
                    <dd>
                        <span @click="compile(item)">编辑</span>
                        <span @click="addressdel(index)">删除</span>
                    </dd>
                </dl>
            </div>
            <button class="address-add" @click="gotoaddressnew">+新增地址</button>
        </div>
        <Toast></Toast>
    </div>
</template>
<script>
import { getCookie } from "../../utils/utils";
export default {
    data() {
        return {
            data: [],
            flag: false,
            txt: "设为默认"
        };
    },
    created() {
        this.$http
            .post("/api/addrlist", { token: getCookie("token") })
            .then(res => {
                //console.log(res);
                if(res.code == 1){
                    this.data = res.data;
                }
                if(res.code == 0){
                    this.$toastBus.$emit('toast',res.msg)
                    setTimeout(()=>{
                        this.$router.push({
                            name:'login',
                            query:{
                                from:'address'
                            }
                        })
                    },1500)
                }
            });
    },
    computed: {
        checkedClass() {
            let str = "iconfont ";
            return this.flag
                ? str + "icon-danxuankuangyixuanzhong"
                : str + "icon-radiobt_1";
        }
    },
    methods: {
        beforemine() {
            this.$router.push({
                name: "mine"
            });
        },
        gotoaddressnew() {
            this.$router.push({
                name: "addressnew",
                query:{
                    type:"add"
                }
            });
        },
        compile(data){
            this.$router.push({
                name: "addressnew",
                query:{
                    type:"edit",
                    name:data.name,
                    phone:data.phone,
                    province:encodeURI(data.province),
                    city:data.city,
                    area:data.area,
                    street:data.street
                }
            });
        },
        check() {
            this.flag = !this.flag;
            if (this.flag) {
                this.txt = "默认地址";
            } else {
                this.txt = "设为默认";
            }
        },
        addressdel(ind){
            
        }
    }
};
</script>
<style>
.address {
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    display: flex;
    flex-direction: column;
}
.address-top {
    height: 0.9rem;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
}
.address-top b {
    position: absolute;
    left: 10px;
    line-height: 0.9rem;
}
.address-top h1 {
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
}
.address-main{
    flex: 1;
    overflow: auto;
}
.address-no {
    height: 2rem;
    background: #fff;
    text-align: center;
}
.address-no h2 {
    line-height: 2rem;
}
.address-list {
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
}
.address-list h3 {
    line-height: 0.6rem;
}
.address-list h3 span {
    margin-left: 10px;
}
.address-list p {
    line-height: 0.6rem;
}
.address-list dl {
    height: 0.8rem;
    display: flex;
    border-top: 1px solid #eee;
    margin-top: 5px;
}
.address-list dl dt {
    flex: 1;
}
.address-list dl dt span {
    line-height: 0.8rem;
}
.address-list dl dd {
    flex: 1;
    text-align: right;
}
.address-list dl dd span {
    display: inline-block;
    width: 30%;
    line-height: 0.8rem;
}
.address-add {
    width: 60%;
    height: 0.9rem;
    background: red;
    color: #fff;
    border: none;
    border-radius: 0.9rem;
    margin-left: 20%;
}
</style>
