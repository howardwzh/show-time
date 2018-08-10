<template>
  <div id="ChartJS" class="chart">
    <div class="chart-dashboard">
      <div class="chart-dashboard-config">
        <ChartConfig />
      </div>
      <div class="chart-dashboard-show">
        <Chart :chartData.sync="chartData" />
      </div>
    </div>
    <textarea class="chart-code" :value="formatJS" readonly></textarea>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import beautify from 'js-beautify'
import Chart from './Chart'
import ChartConfig from './ChartConfig'

export default {
  name: 'ChartJS',
  data () {
    return {
    }
  },
  computed: {
    formatJS () {
      return beautify(JSON.stringify(this.chartData))
    },
    ...mapState([
      'chartData'
    ])
  },
  components: {
    Chart,
    ChartConfig
  },
  methods: {
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
