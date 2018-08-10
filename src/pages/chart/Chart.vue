<template>
  <canvas :id="id" :width="width" :height="height"></canvas>
</template>

<script>
import Chart from 'chart.js'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Chart',
  props: {
    chartData: Object,
    width: String,
    height: String
  },
  mounted () {
    this.createChart()
  },
  data () {
    return {
      id: new Date().getTime(),
      myChart: null
    }
  },
  methods: {
    createChart () {
      if (!this.chartData.type) return
      const deepChartData = _cloneDeep(this.chartData)
      const ctx = this.$el
      this.myChart = new Chart(ctx, {
        type: deepChartData.type,
        data: deepChartData.data,
        options: deepChartData.options
      })
    },
    updateChart: function () {
      if (!this.chartData.type) return
      const deepChartData = _cloneDeep(this.chartData)
      const datasets = deepChartData.data.datasets
      delete deepChartData.data.datasets
      this.myChart.config.type = deepChartData.type
      this.myChart.data = {...this.myChart.data, ...deepChartData.data}
      datasets.forEach((item, index) => {
        this.myChart.data.datasets[index] = {...this.myChart.data.datasets[index], ...item}
      })
      this.myChart.options = {...this.myChart.options, ...deepChartData.options}
      this.myChart.update()
    }
  },
  watch: {
    chartData: {
      handler () {
        if (!this.myChart) {
          this.createChart()
        } else {
          this.updateChart()
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.chart-wrapper {
}
</style>
