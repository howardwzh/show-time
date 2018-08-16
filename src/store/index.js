import Vue from 'vue'
import Vuex from 'vuex'
import chart from './modules/chart'
import skrollr from './modules/skrollr'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chart,
    skrollr
  }
})