<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 12px;
}
body,html{
    width: 100%;
    height: 100%;
}
#app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    color: #2c3e50;
}
</style>
