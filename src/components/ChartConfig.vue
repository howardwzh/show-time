<template>
  <div id="ChartConfig" class="chart-config">
    <RenderHelper :data.sync="chartData" :keyUpHandle.sync="keyUpHandle" root="chartData" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import checkType from '../assets/utils/checkType.js'
import RenderHelper from './RenderHelper'

export default {
  name: 'ChartConfig',
  props: {
  },
  data () {
    return {
      form: {
        type: null
      }
    }
  },
  components: {
    RenderHelper
  },
  computed: {
    ...mapState([
      'chartData'
    ])
  },
  methods: {
    ...mapActions([
      'updateData'
    ]),
    checkType (obj) {
      return checkType(obj)
    },
    keyUpHandle (key, value) {
      if (/^\[.*\]$/.test(value)) {
        value = JSON.parse(value)
      } else if (/true|false/.test(value)) {
        value = value === 'true'
      }
      this.updateData({pos: key, val: value })
    }
  }
}
</script>

<style scoped lang="less">
</style>
