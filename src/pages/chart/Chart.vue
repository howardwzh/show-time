<template>
  <canvas id="chart-show"></canvas>
</template>

<script>
import Chart from 'chart.js'
import _cloneDeep from 'lodash/cloneDeep'
import {firstUpperCase} from './assets/utils'

export default {
  name: 'Chart',
  props: {
    type: String,
    chartData: Object,
    chartDataChange: Number
  },
  mounted () {
    this.createChart()
  },
  computed: {
  },
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    createChart () {
      if (!this.type) return
      const deepChartData = _cloneDeep(this.chartData)
      const ctx = this.$el
      this.myChart && this.myChart.destroy()
      const ChartForNew = Chart[firstUpperCase(this.type)] || Chart
      this.myChart = new ChartForNew(ctx, {
        type: deepChartData.type,
        data: deepChartData.data,
        options: deepChartData.options
      })
    },
    updateChart: function () {
      if (!this.type) return
      const deepChartData = _cloneDeep(this.chartData)
      const datasets = deepChartData.data.datasets
      delete deepChartData.data.datasets
      this.myChart.data = {...this.myChart.data, ...deepChartData.data}
      datasets.forEach((item, index) => {
        this.myChart.data.datasets[index] = {...this.myChart.data.datasets[index], ...item}
      })
      this.myChart.options = {...this.myChart.options, ...deepChartData.options}
      this.myChart.update()
    }
  },
  watch: {
    chartDataChange () {
      if (
        !this.myChart ||
        this.myChart.config.type !== this.type // 已经有图表，类型不同时不能直接更新，需要重新生成
      ) {
        this.createChart()
      } else {
        this.updateChart()
      }
    }
  }
}
</script>

<style scoped lang="less">
.chart-wrapper {
}
</style>
