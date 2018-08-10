<template>
  <div id="ChartConfig" class="chart-config">
    <div class="form-render">
      <label>
        type:
        <select @change="setChartType($event.target.value)">
          <option v-for="item in types" :value="item" :key="item" :selected="item === currentType">{{item}}</option>
        </select>
      </label>
      <div class="item-desc" v-if="getDescFromKey(`chartData.type`)">
        <label v-for="(dv, dk) in getDescFromKey(`chartData.type`)" :key="dk">
          {{dk}}: <span>{{dv}}</span>
        </label>
      </div>
    </div>
    <ChartConfigFormRender :data.sync="chartData" root="chartData" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartConfigFormRender from './ChartConfigFormRender'
import { types, desc } from './data'

export default {
  name: 'ChartConfig',
  props: {
  },
  created () {
    this.setChartType('line')
  },
  data () {
    return {
      types: types,
      currentType: 'line'
    }
  },
  components: {
    ChartConfigFormRender
  },
  computed: {
    ...mapState([
      'chartData'
    ])
  },
  methods: {
    ...mapActions([
      'initData'
    ]),
    setChartType (type) {
      this.currentType = type
      this.initData(type)
    },
    getDescFromKey (key) {
      return desc[key.replace(/\.\d/g, '')]
    }
  }
}
</script>

<style lang="less">
.form-render {
  padding-left: 16px;
  padding-bottom: 10px;
}
</style>
