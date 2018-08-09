import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 'line',
    chartData: {}
  },
  mutations: {
    initData (state, chartData) {
      state.chartData = chartData
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
    }
  },
  actions: {
    initData ({commit}, chartData) {
      commit('initData', chartData)
    },
    updateData ({commit}, payload) {
      commit('updateData', payload)
    }
  }
})