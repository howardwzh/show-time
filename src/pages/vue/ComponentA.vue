<template>
  <Group>
    <button @click="addCount">加1</button>
    <p>{{count}}</p>
  </Group>
</template>

<script>
export default {
  name: 'ComponentA',
  data () {
    return {
      count: 0
    }
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
