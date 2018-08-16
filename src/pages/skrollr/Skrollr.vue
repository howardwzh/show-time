<template>
  <div id="skrollr-body">
    <div class="skrollr-filling-500"></div>
    <div v-html="skrollrData"></div>
    <div class="skrollr-filling-1000"></div>
  </div>
</template>

<script>
import skrollr from 'skrollr'

export default {
  name: 'Skrollr',
  props: {
    skrollrData: String
  },
  mounted () {
    this.createSkrollr()
  },
  data () {
    return {
      mySkrollr: null
    }
  },
  methods: {
    createSkrollr () {
      this.mySkrollr = skrollr.init()
    },
    refreshSkrollr () {
      setTimeout(() => {
        this.mySkrollr.refresh()
      }, 200)
    }
  },
  watch: {
    skrollrData: function () {
      if (this.mySkrollr) {
        this.refreshSkrollr()
      } else {
        this.createSkrollr()
      }
    }
  }
}
</script>

<style scoped lang="less">
.skrollr-filling-500 {
  height: 500px;
}
.skrollr-filling-1000 {
  height: 1000px;
}
</style>
