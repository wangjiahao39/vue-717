<template>
    <div class="toast">
        <div class="tips" v-show="isActive">{{msg}}<slot v-if="msg==''"></slot></div>
        <div class="tips" v-show="isActive"><slot name="2"></slot></div>
        <div class="tips" v-show="isActive"><slot name="3"></slot></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isActive:false,
            msg:''
        }
    },
    props:{
        
    },
    watch:{
        isActive(n,o){
            if(n){
                setTimeout(()=>{
                    this.isActive = false
                },2000)
            }
        }
    },
    methods:{
        active(){
            this.isActive = true
        }
    }
}
</script>
<style>
    @import './toast.css'
</style>