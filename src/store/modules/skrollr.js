import _cloneDeep from 'lodash/cloneDeep'
import _set from 'lodash/set'
import _get from 'lodash/get'
import {data, style} from '../../pages/skrollr/assets/data/'

const skrollr = {
  state: {
    skrollrData: []
  },
  mutations: {
    'skrollr/initData' (state) {
      const dataFromCache = localStorage.getItem('skrollrData')
      state.skrollrData = dataFromCache ? JSON.parse(dataFromCache) : _cloneDeep(data)
    },
    'skrollr/updateData' (state, {pos, val}) {
      const level = pos.split('.')
      _set(state, level, val)
    },
    'skrollr/addData' (state, {pos}) {
      const level = pos.split('.')
      const tempLevel = pos.replace(/.\d+./g, '.0.').split('.')
      const tempState = {
        skrollrData: _cloneDeep(data)
      }
      const originArray = _get(state, level)
      originArray.push(_get(tempState, tempLevel)[0])
    },
    'skrollr/deleteData' (state, {pos}) {
      const level = pos.split('.')
      const index = level.pop()
      const originArray = _get(state, level)
      originArray.splice(index, 1)
    },
    'skrollr/addStyle' (state, {pos, styleType}) {
      const level = pos.split('.')
      const styleData = _get(state, level)
      style.get({styleType, styleData}).checked = true
    },
    'skrollr/deleteStyle' (state, {pos, styleType}) {
      const level = pos.split('.')
      const styleData = _get(state, level)
      style.get({styleType, styleData}).checked = false
    },
    'skrollr/updateSStyleData' (state, {pos, val}) {
      const level = pos.split('.')
      const SStyleData = _get(state, level)
      SStyleData.map((ss) => {
        ss.checked = false
        val.map((s) => {
          const styleType = style.getStyleType(s)
          if (ss.name === styleType) {
            ss.value = s
            ss.checked = true
          }
        })
      })
    }
  },
  actions: {
    'skrollr/initData' ({commit}) {
      commit('skrollr/initData')
    },
    'skrollr/updateData' ({commit}, {pos, val}) {
      if (/true|false/.test(val)) {
        val = val === 'true'
      }
      commit('skrollr/updateData', {pos, val})
    },
    'skrollr/addData' ({commit}, {pos}) {
      commit('skrollr/addData', {pos})
    },
    'skrollr/deleteData' ({commit}, {pos}) {
      commit('skrollr/deleteData', {pos})
    },
    'skrollr/addStyle' ({commit}, {pos, styleType}) {
      commit('skrollr/addStyle', {pos, styleType})
    },
    'skrollr/deleteStyle' ({commit}, {pos, styleType}) {
      commit('skrollr/deleteStyle', {pos, styleType})
    },
    'skrollr/updateSStyleData' ({commit}, {pos, val}) {
      commit('skrollr/updateSStyleData', {pos, val})
    }
  }
}
export default skrollr