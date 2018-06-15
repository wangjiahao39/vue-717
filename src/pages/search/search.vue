<template>
    <div class="search">
        <div class="search-top">
            <input @input="search" type="text" v-model="keywords">
            <span>搜索</span>
        </div>
        <ul v-html="htmls"></ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            keywords:'',
            htmls:''
        }
    },
    methods:{
        search(){
            this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.keywords}&dotime=1529047209000`).then(res=>{
                this.htmls = res
            })
        }
    }
}
</script>
<style>
.search-top{
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
}
.search-top input{
    width: 70%;
}
</style>
