<template>
    <div class="detail">
        <iframe class="ifram" :src="decodeURIComponent(this.$route.query.url)" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {

}
</script>
<style>
*{
    margin: 0;
    padding: 0;
}
.detail{
    height: 100%;
}
.ifram{
    width: 100%;
    height: 100%;
}
.detail_standard{
    width: 100%;
    height: 100%;
}
</style>
