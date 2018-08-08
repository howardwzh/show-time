<template>
  <div id="XLine" class="chart">
    <div class="chart-dashboard">
      <div class="chart-dashboard-config">
        <ChartConfig :chartData.sync="chartConfig" />
      </div>
      <div class="chart-dashboard-show">
        <Chart :chartData.sync="chartData" />
      </div>
    </div>
    <textarea class="chart-code" :value="formatJS"></textarea>
  </div>
</template>

<script>
import beautify from 'js-beautify'
import Chart from '../../components/Chart'
import ChartConfig from '../../components/ChartConfig'

const chartData = {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
      steppedLine: false
    }]
  },
  // Configuration options go here
  options: {
    
  }
}
export default {
  name: 'XLine',
  data () {
    return {
      chartData: {},
      chartConfig: {
        type: 'line'
      }
    }
  },
  created () {
    setTimeout(() => {
      this.chartData = chartData
    }, 1000);
  },
  computed: {
    formatJS () {
      return beautify(JSON.stringify(this.chartData))
    }
  },
  components: {
    Chart,
    ChartConfig
  },
  methods: {
    setChartData () {
      // this.chartData.type = this.chartData.type === 'bar' ? 'line' : 'bar'
      this.chartData.data.datasets[0].data = this.chartData.data.datasets[0].data.reverse()
      this.chartData.data.datasets[0].label = this.chartData.data.datasets[0].label === 'bar' ? 'line' : 'bar'
      // this.chartData = {...this.chartData, data: {datasets: [{label: 'bar'}]}}
    }
  }
}
</script>

<style lang="less">
.chart {
  &-dashboard {
    display: flex;
    &-config {
      flex: 2;
    }
    &-show {
      flex: 10;
    }
  }
  &-code {
    width: 100%;
    height: 300px;
  }
}
</style>
