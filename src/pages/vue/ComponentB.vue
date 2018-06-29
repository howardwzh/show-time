<template>
  <Group>
    <button @click="minusCount">减1</button>
    <p>{{count}}</p>
  </Group>
</template>

<script>
export default {
  name: 'ComponentB',
  data () {
    return {
      count: 100
    }
  },
  methods: {
    minusCount () {
      this.count -= 1
    }
  }
}
</script>

<style>
</style>
