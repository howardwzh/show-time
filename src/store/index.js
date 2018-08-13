import Vue from 'vue'
import Vuex from 'vuex'
import {getChartDataByType} from '../pages/chart/assets/utils'
import _cloneDeep from 'lodash/cloneDeep'
import _set from 'lodash/set'
import _get from 'lodash/get'

Vue.use(Vuex)

let index = 0

export default new Vuex.Store({
  state: {
    type: '',
    chartData: {}
  },
  mutations: {
    initData (state, type) {
      index = 1
      state.chartData = _cloneDeep(getChartDataByType(type, index))
      state.type = type
    },
    updateData (state, {pos, val}) {
      const level = pos.split('.')
      _set(state, level, val)
    },
    addData (state, {pos}) {
      const level = pos.split('.')
      const tempState = {
        chartData: _cloneDeep(getChartDataByType(state.type, ++index))
      }
      const originArray = _get(state, level)
      originArray.push(_get(tempState, level)[0])
    }
  },
  actions: {
    initData ({commit}, type) {
      commit('initData', type)
    },
    updateData ({commit}, {pos, val}) {
      if (/true|false/.test(val)) {
        val = val === 'true'
      }
      commit('updateData', {pos, val})
    },
    addData ({commit}, {pos}) {
      commit('addData', {pos})
    }
  }
})