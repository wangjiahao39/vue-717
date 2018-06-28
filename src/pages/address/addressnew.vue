<template>
    <div class="addressnew">
        <div class="addressnew-top">
            <b @click="beforeaddress">＜</b>
            <h1>收货人</h1>
        </div>
        <ul class="addressnew-list">
            <li><input type="text" placeholder="收货人姓名" v-model="name"></li>
            <li><input type="text" placeholder="手机号" v-model="phone"></li>
            <li>
                <multiselect @select="provChange" v-model="province" :options="provlist" label="name" placeholder="请选择省份"></multiselect>
                <multiselect @select="cityChange" v-model="city" :options="citylist" label="name" placeholder="请选择城市"></multiselect>
            </li>
            <li>
                <multiselect v-model="area" :options="arealist" placeholder="请选择市区"></multiselect>
            </li>
            <li><input type="text" placeholder="详细地址" v-model="street"></li>
        </ul>
        <button class="addressnew-btn" @click="saveFn">保存</button>
        <Toast></Toast>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import {anotherInstance} from '../../utils/request'
import { getCookie } from '../../utils/utils';
export default {
    data(){
        return {
            name:'',
            phone:'',
            street:'',
            city:'',
            area:'',
            province:'',
            provlist:[],
            citylist:[],
            arealist:[]
        }
    },
    created(){
        console.log(this.$route.query)
        console.log(decodeURI(this.$route.query.province))
        let {type,name,phone,street,city,area,province} = this.$route.query;
        if(type == 'edit'){
            this.name = name;
            this.phone = phone;
            this.street = street;
            this.city = {name:city};
            this.province = {name:decodeURI(province)};
            this.area = area;
        }
        anotherInstance.get('/server/pcrdata/pcr.json').then(res=>{
            //console.log(res.data);
            this.provlist = res.data;
        })
    },
    methods:{
        beforeaddress(){
            this.$router.push({
                name:'address'
            })
        },
        provChange(a,b){
            this.citylist = a.city;
            this.city = '';
            this.area = '';
        },
        cityChange(a){
            this.arealist = a.area;
            this.area = '';
        },
        saveFn(){
            console.log(this.province,this.city,this.area);
            let data = {
                name:this.name,
                phone:this.phone,
                street:this.street,
                province:this.province.name,
                city:this.city.name,
                area:this.area
            }
            if(!data.name || !data.phone || !data.province || !data.city || !data.area){
                this.$toastBus.$emit('toast',"请把信息填写完整");
                return;
            }
            if(!/^1[3578]\d{9}$/.test(data.phone)){
                this.$toastBus.$emit('toast','请填写正确的手机号');
                return;
            }
            this.$http.post('/api/addressnew',{
                token:getCookie('token'),
                data
            }).then(res=>{
                if(res.code == '1'){
                    this.$toastBus.$emit('toast',res.msg)
                    setTimeout(()=>{
                        this.$router.push({
                            name:'address',
                        })
                    },1500)
                }
                if(res.code == 0){
                    this.$toastBus.$emit('toast',res.msg)
                    setTimeout(()=>{
                        this.$router.push({
                            name:'login',
                            query:{
                                from:'addressnew'
                            }
                        })
                    },1500)
                }
            })
        }
    },
    components:{ 
        Multiselect
    }
}
</script>
<style>
.addressnew{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
.addressnew-top{
    height: 0.9rem;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
}
.addressnew-top b{
    position: absolute;
    left: 10px;
    line-height: .9rem;
}
.addressnew-top h1{
    text-align: center;
    line-height: .9rem;
    font-size: .32rem;
}
.addressnew-list li{
    line-height: .8rem;
    background: #fff;
    margin: 10px 10px 0 10px;
}
.addressnew-list li input{
    width: 100%;
    line-height: .8rem;
    border: none;
    padding-left: 10px;
    box-sizing: border-box;
    outline: none;
}
.addressnew-list li:nth-child(3){
    display: flex;
}
.addressnew-list li:nth-child(3) .multiselect{
    height: 0.8rem;
    flex: 1;
}
.addressnew-btn{
    width: 60%;
    height: 0.9rem;
    background: red;
    color: #fff;
    border: none;
    border-radius: .9rem;
    margin-left: 20%;
    margin-top: 20px;
}
</style>
