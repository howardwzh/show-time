<template>
  <Group title="">
    <p><button @click="changeComponent('A')">Posts</button><button @click="changeComponent('B')">Archive</button></p>
    <h4>切换会刷新</h4>
    <component :is="component"></component>
    <h4>切换不会刷新</h4>
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
  </Group>
</template>

<script>
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'

export default {
  name: 'DynamicComponent',
  data () {
    return {
      component: ComponentA
    }
  },
  methods: {
    changeComponent (key) {
      if (key === 'A') {
        this.component = ComponentA
      } else {
        this.component = ComponentB
      }
    }
  }
}
</script>

<style>
</style>
