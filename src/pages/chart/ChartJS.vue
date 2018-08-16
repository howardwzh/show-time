<template>
  <div id="ChartJS" class="chart">
    <div class="chart-dashboard">
      <div class="chart-dashboard-config">
        <ChartConfig />
      </div>
      <div class="chart-dashboard-show">
        <Chart :type.sync="type" :chartData.sync="chartData" :chartDataChange="chartDataChange" />
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
import {stringifyPro} from './assets/utils'

export default {
  name: 'ChartJS',
  data () {
    return {
    }
  },
  computed: {
    formatJS () {
      if (this.chartDataChange) {
        return beautify(stringifyPro(this.chartData))
      }
    },
    ...mapState({
      type (state) {
        return state.chart.type
      },
      chartData (state) {
        return state.chart.chartData
      },
      chartDataChange (state) {
        return state.chart.chartDataChange
      }
    })
  },
  components: {
    Chart,
    ChartConfig
  }
}
</script>

<style lang="less">
@configWidth: 500px;
.chart {
  &-dashboard {
    position: relative;
    &-config {
      width: @configWidth;
      max-height: 600px;
      overflow: auto;
    }
    &-show {
      position: absolute;
      top: 0;
      left: @configWidth;
      right: 0;
      bottom: 0;
      margin: 0 60px;
    }
  }
  &-code {
    width: 100%;
    height: 300px;
    margin-top: 20px;
  }
}
</style>
