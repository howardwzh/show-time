<template>
  <div>
    <div @click.self="formRenderClickHandle($event)" class="form-render" :class="{'tip-icon': getDescFromKey(`${root}.${key}`)}" v-for="(val, key) in data" :key="key">
      <div v-if="!(/array|object/).test(checkType(val)) && key !== 'type'">
        <label class="input-wrapper"><span>{{key}}: </span><input type="text" :value="checkType(val) === 'function' ? 'function' : val" :disabled="checkType(val) === 'function'" @keyup="updateDataHandle(`${root}.${key}`, $event)"/></label>  
      </div>
      <div v-else-if="checkType(val) === 'object'">
        <label>{{key}}: </label>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/array|object/).test(checkType(val[0]))">
        <label class="input-wrapper"><span>{{key}}: </span> [<textarea type="text" :value="arrayStringfiy(val)" @keyup="updateArrayDataHandle(`${root}.${key}`, $event)"></textarea>]</label>
      </div>
      <div v-else-if="checkType(val) === 'array' && checkType(val[0]) === 'object'">
        <label>{{key}}: </label><button @click="addData({pos: `${root}.${key}`})">+</button>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <!-- 属性描述 -->
      <div class="item-desc" v-if="getDescFromKey(`${root}.${key}`)">
        <label v-for="(dv, dk) in getDescFromKey(`${root}.${key}`)" :key="dk">
          {{dk}}: <span>{{dv}}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import checkType from '../../assets/utils/checkType.js'
import { desc } from './assets/data'
import { isNumber, isColor } from './assets/validate'

export default {
  name: 'ChartConfigFormRender',
  props: {
    data: Object|Array,
    root: String
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'updateData',
      'addData'
    ]),
    updateDataHandle (pos, e) {
      const val = e.target.value
      this.updateData({pos, val})
    },
    updateArrayDataHandle (pos, e) {
      const str = e.target.value
      const arr = str.split('\n')
      const arrLength = arr.length
      if (isNumber(arr[0]) && !isNumber(arr[arrLength - 1])) {
        return
      } else if (isColor(arr[0]) && !isColor(arr[arrLength - 1])) {
        return
      }
      this.updateData({pos, val: arr})
    },
    checkType (obj) {
      return checkType(obj)
    },
    arrayStringfiy (arr) {
      return arr.join('\n')
    },
    getDescFromKey (key) {
      return desc[key.replace(/\.\d/g, '')]
    },
    formRenderClickHandle (e) {
      const className = e.target.className
      const newClassName = /active/.test(className) ? className.replace(/ active/, '') : `${className} active`
      e.target.className = newClassName
    }
  }
}
</script>

<style lang="less">
</style>
