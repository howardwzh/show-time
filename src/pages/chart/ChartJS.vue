<template>
  <div id="ChartJS" class="chart">
    <div class="chart-dashboard">
      <div class="chart-dashboard-config">
        <select @change="setChartType($event.target.value)">
          <option selected value="">请选择</option>
          <option v-for="item in types" :value="item" :key="item">{{item}}</option>
        </select>
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
import { mapState, mapActions } from 'vuex'
import beautify from 'js-beautify'
import Chart from '../../components/Chart'
import ChartConfig from '../../components/ChartConfig'
import * as allChartdata from './data/'

export default {
  name: 'ChartJS',
  data () {
    return {
      types: allChartdata.types
    }
  },
  created () {
    setTimeout(() => {
      this.setChartType('line')
    }, 1000);
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
    ...mapActions([
      'initData',
      'updateData'
    ]),
    setChartType (type) {
      this.initData(allChartdata[`${type}Data`])
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
