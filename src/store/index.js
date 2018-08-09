import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chartDataX: {
      aaa: 111
    }
  },
  mutations: {
    init (state, chartDataX) {
      state.chartDataX = chartDataX
    },
    updateData (state, {pos, val}) {
      const level = pos.split('.')
      switch (level.length) {
        case 1:
          state.chartDataX[level[0]] = val
          break;
        case 2:
          state.chartDataX[level[0]][level[1]] = val
          break;
        case 3:
          state.chartDataX[level[0]][level[1]][level[2]] = val
          break;
        case 4:
          state.chartDataX[level[0]][level[1]][level[2]][level[3]] = val
          break;
      
        default:
          break;
      }
    }
  },
  actions: {
    init ({commit}, chartDataX) {
      commit('init', chartDataX)
    },
    updateData ({commit}, payload) {
      commit('updateData', payload)
    }
  }
})