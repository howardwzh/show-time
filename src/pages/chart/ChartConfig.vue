<template>
  <div id="ChartConfig" class="chart-config">
    <div class="form-render">
      <label class="input-wrapper">
        <span>type:</span>
        <select @change="setChartType($event.target.value)">
          <option v-for="item in types" :value="item" :key="item" :selected="item === currentType">{{item}}</option>
        </select>
      </label>
    </div>
    <ChartConfigFormRender :data.sync="chartData" root="chartData" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartConfigFormRender from './ChartConfigFormRender'
import { types, desc } from './assets/data'

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
      currentType: ''
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
  padding: 10px 24px 0 16px;
  background-color: rgba(0, 0, 0, 0.1);
  .item-desc {
    display: none;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    label {
      display: block;
    }
  }
  &:last-child {
    padding-bottom: 10px;
  }
  &.active {
    &>.item-desc {
      display: block;
    }
  }
  .input-wrapper {
    display: flex;
    span {
      width: 150px;
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input, select {
      flex: 1;
    }
  }
  .tip-icon {
    position: relative;
    &::after {
      content: 'i';
      position: absolute;
      width: 12px;
      height: 12px;
      line-height: 1;
      font-size: 10px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      top: 14px;
      right: 5px;
    }
  }
}
</style>
