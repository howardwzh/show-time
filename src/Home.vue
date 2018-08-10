<template>
  <div id="App">
    <span class="icon-wzh logo"></span>
    <HelloWorld msg="Welcome to Show Time"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
@import './assets/font-icon/css/fontello.css';
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .logo {
    font-size: 100px;
    line-height: 1;
    color: #E3B220;
  }
}
</style>
