<template>
  <Group title="">
    <button @click="load">点击异步加载组件（效果查看Network）</button>
    <AsyncComponentC v-if="isLoaded" />
  </Group>
</template>

<script>
export default {
  name: 'AsyncComponent',
  data () {
    return {
      isLoaded: false
    }
  },
  components: {
    AsyncComponentC: () => import('./ComponentC')
  },
  methods: {
    load () {
      this.isLoaded = true
    }
  }
}
</script>

<style>
</style>
