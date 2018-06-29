<template>
  <Group title="">
    <AsyncComponentC />
  </Group>
</template>

<script>
import Vue from 'vue/dist/vue.js'

const AsyncComponentC = Vue.component('AsyncComponentC', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./ComponentC'], resolve)
})

export default {
  name: 'AsyncComponent',
  data () {
    return {
    }
  },
  components: {
    AsyncComponentC
  }
}
</script>

<style>
</style>
