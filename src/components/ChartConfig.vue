<template>
  <div id="ChartConfig" class="chart-config">
    <div v-for="(val, key) in chartData" :key="key">
      {{renderHelper(val, key, 0)}}
    </div>
  </div>
</template>

<script>
import checkType from '../assets/utils/checkType.js'

export default {
  name: 'ChartConfig',
  props: {
    chartData: Object
  },
  data () {
    return {
      checkType
    }
  },
  computed: {
    
  },
  methods: {
    renderHelper (val, key, level) {
      const _level = (level || 0) + 1
      let result = null
      switch (this.checkType(val)) {
        case 'object':
          for (const k in val) {
            result += this.renderHelper(val[k], k, _level)
          }
          break;
      
        default:
          result = (<div><label>key</label><input type="text" v-model="val" /></div>)
          break;
      }
      console.log(_level)
      return result
    }
  }
}
</script>

<style scoped lang="less">
</style>
