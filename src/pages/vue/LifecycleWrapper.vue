<template>
  <Group>
    <button @click="toggle=false">销毁</button>
    <button @click="toggle=true">生成</button>
    <Lifecycle v-bind:count="count" v-if="toggle" @addCount="addCount"/>
  </Group>
</template>

<script>
import Lifecycle from './Lifecycle'

export default {
  name: 'LifecycleWrapper',
  data () {
    return {
      count: 0,
      toggle: false
    }
  },
  components: {
    Lifecycle
  },
  methods: {
    addCount () {
      this.count += 1
    }
  }
}
</script>

<style>
</style>
