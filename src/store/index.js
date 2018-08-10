import Vue from 'vue'
import Vuex from 'vuex'
import * as allChartData from '../pages/chart/data'
import _cloneDeep from 'lodash/cloneDeep'

let tempState = {
  ChartData: {}
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 'line',
    chartData: {}
  },
  mutations: {
    initData (state, type) {
      state.chartData = _cloneDeep(allChartData[`${type}Data`])
      tempState.chartData = _cloneDeep(allChartData[`${type}Data`])
    },
    updateData (state, {pos, val}) {
      const level = pos.split('.')
      switch (level.length) {
        case 1:
          state[level[0]] = val
          break;
        case 2:
          state[level[0]][level[1]] = val
          break;
        case 3:
          state[level[0]][level[1]][level[2]] = val
          break;
        case 4:
          state[level[0]][level[1]][level[2]][level[3]] = val
          break;
        case 5:
          state[level[0]][level[1]][level[2]][level[3]][level[4]] = val
          break;
      
        default:
          break;
      }
    },
    addData (state, {pos}) {
      const level = pos.split('.')
      switch (level.length) {
        case 1:
          state[level[0]].push(_cloneDeep(tempState[level[0]][0]))
          break;
        case 2:
          state[level[0]][level[1]].push(_cloneDeep(tempState[level[0]][level[1]][0]))
          break;
        case 3:
          state[level[0]][level[1]][level[2]].push(_cloneDeep(tempState[level[0]][level[1]][level[2]][0]))
          break;
        case 4:
          state[level[0]][level[1]][level[2]][level[3]].push(_cloneDeep(tempState[level[0]][level[1]][level[2]][level[3]][0]))
          break;
        case 5:
          state[level[0]][level[1]][level[2]][level[3]][level[4]].push(_cloneDeep(tempState[level[0]][level[1]][level[2]][level[3]][level[4]][0]))
          break;
      
        default:
          break;
      }
    }
  },
  actions: {
    initData ({commit}, chartData) {
      commit('initData', chartData)
    },
    updateData ({commit}, {pos, val}) {
      if (/^\[.*\]$/.test(val)) {
        val = JSON.parse(val)
      } else if (/true|false/.test(val)) {
        val = val === 'true'
      }
      commit('updateData', {pos, val})
    },
    addData ({commit}, {pos}) {
      commit('addData', {pos})
    }
  }
})