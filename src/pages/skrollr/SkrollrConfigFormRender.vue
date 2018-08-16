<template>
  <div>
    <div @click.self="formRenderClickHandle($event)" class="form-render" :class="{'tip-icon': getDescFromKey(`${root}.${key}`)}" v-for="(val, key) in data" :key="key">
      <button v-if="checkType(data) === 'array'" @click="toggleHandle(`${root}.${key}`)">收起/展开</button>
      <div v-if="!(/array|object/).test(checkType(val))">
        <label class="input-wrapper"><span>{{key}}: </span><input type="text" :value="checkType(val) === 'function' ? 'function' : val" :disabled="checkType(val) === 'function'" @keyup="updateDataHandle(`${root}.${key}`, $event)"/></label>  
      </div>
      <div v-show="!toggleHide[`${root}.${key}`]" v-else-if="checkType(val) === 'object'">
        <label>{{key}}: </label>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/object|array/).test(checkType(val[0]))">
        <label class="input-wrapper"><span>{{key}}: </span> [<textarea type="text" :value="arrayStringfiy(val)" @keyup="updateArrayDataHandle(`${root}.${key}`, $event)"></textarea>]</label>
      </div>
      <div v-show="!toggleHide[`${root}.${key}`]" v-else-if="checkType(val) === 'array' && (/object|array/).test(checkType(val[0]))">
        <label>{{key}}: </label><button @click="addData(`${root}.${key}`)">+</button>
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
// import { desc } from './assets/data'
import { isNumber, isColor } from './assets/validate'

export default {
  name: 'ChartConfigFormRender',
  props: {
    data: Array|Object,
    root: String
  },
  created () {
  },
  data () {
    return {
      toggleHide: {}
    }
  },
  methods: {
    ...mapActions([
      'skrollr/updateData',
      'skrollr/addData'
    ]),
    addData (pos) {
      this['skrollr/addData']({pos})
    },
    updateDataHandle (pos, e) {
      const val = e.target.value
      this['skrollr/updateData']({pos, val})
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
      this['skrollr/updateData']({pos, val: arr})
    },
    checkType (obj) {
      return checkType(obj)
    },
    arrayStringfiy (arr) {
      return arr.join('\n')
    },
    getDescFromKey () {
      return ''
    },
    formRenderClickHandle (e) {
      const className = e.target.className
      const newClassName = /active/.test(className) ? className.replace(/ active/, '') : `${className} active`
      e.target.className = newClassName
    },
    toggleHandle (key) {
      this.toggleHide[key] = !this.toggleHide[key]
    }
  }
}
</script>

<style lang="less">
</style>
