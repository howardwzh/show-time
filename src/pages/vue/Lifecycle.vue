<template>
  <div id="Lifecycle">
    <h4>请查看控制台</h4>
    <p>更新prop：<button @click="updateProp">开始</button><span>传入计数：{{count}}</span></p>
    <p>更新data：<button @click="updateData">开始</button><span>传入计数：{{selfCount}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'Lifecycle',
  props: {
    count: Number
  },
  data () {
    return {
      selfCount: 0
    }
  },
  beforeCreate () {
    console.log('I am in beforeCreate')
  },
  created () {
    console.log('I am in created')
  },
  beforeMount () {
    console.log('I am in beforeMount')
  },
  mounted () {
    console.log('I am in mounted')
  },
  beforeUpdate () {
    console.log('I am in beforeUpdate')
  },
  updated () {
    console.log('I am in updated')
  },
  beforeDestroy () {
    console.log('I am in beforeDestroy')
  },
  destroyed () {
    console.log('I am in destroyed')
  },
  methods: {
    updateProp () {
      this.$parent.count += 1
    },
    updateData () {
      this.selfCount += 1
    }
  }
}
</script>

<style>
</style>
