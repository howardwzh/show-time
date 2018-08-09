import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chartData: {
      aaa: 111
    }
  },
  mutations: {
    init (state, chartData) {
      state.chartData = chartData
    },
    updateData (state, {pos, val}) {
      const level = pos.split('.')
      switch (level.length) {
        case 1:
          state.chartData[level[0]] = val
          break;
        case 2:
          state.chartData[level[0]][level[1]] = val
          break;
        case 3:
          state.chartData[level[0]][level[1]][level[2]] = val
          break;
        case 4:
          state.chartData[level[0]][level[1]][level[2]][level[3]] = val
          break;
      
        default:
          break;
      }
    }
  },
  actions: {
    init ({commit}, chartData) {
      commit('init', chartData)
    },
    updateData ({commit}, payload) {
      commit('updateData', payload)
    }
  }
})