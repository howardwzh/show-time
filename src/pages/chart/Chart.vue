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
      this.myChart && this.myChart.destroy()
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
        if (
          !this.myChart ||
          this.myChart.config.type !== this.chartData.type // 已经有图表，类型不同时不能直接更新，需要重新生成
        ) {
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
