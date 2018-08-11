<template>
  <div>
    <div @click.self="formRenderClickHandle($event)" class="form-render" :class="{'tip-icon': getDescFromKey(`${root}.${key}`)}" v-for="(val, key) in data" :key="key">
      <div v-if="!(/array|object/).test(checkType(val)) && key !== 'type'">
        <label class="input-wrapper"><span>{{key}}: </span><input type="text" :value="val" @keyup="updateData({pos: `${root}.${key}`, val: $event.target.value})"/></label>  
      </div>
      <div v-else-if="checkType(val) === 'object'">
        <label>{{key}}: </label>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/array|object/).test(checkType(val[0]))">
        <label class="input-wrapper"><span>{{key}}: </span> [<input type="text" :value="arrayStringfiy(val)" @keyup="updateData({pos: `${root}.${key}`, val: `[${$event.target.value}]`})"/>]</label>
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
import { desc } from './data'

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
    checkType (obj) {
      return checkType(obj)
    },
    arrayStringfiy (arr) {
      return JSON.stringify(arr).slice(1, -1)
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
