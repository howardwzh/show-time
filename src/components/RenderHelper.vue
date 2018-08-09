<template>
  <div>
    <div v-for="(val, key) in data" :key="key">
      <div v-if="!(/array|object/).test(checkType(val))"><label>{{key}}</label><input type="text" :disabled="key === 'type'" :value="val" @keyup="keyUpHandle(`${root}.${key}`, $event.target.value)"/></div>
      <div v-else-if="checkType(val) === 'object'">
        <label>{{key}}</label>
        <RenderHelper :data.sync="val" :keyUpHandle.sync="keyUpHandle" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/array|object/).test(checkType(val[0]))"><label>{{key}}</label><input type="text" :value="arrayStringfiy(val)" @keyup="keyUpHandle(`${root}.${key}`, $event.target.value)"/></div>
      <div v-else-if="checkType(val) === 'array' && checkType(val[0]) === 'object'">
        <RenderHelper :data.sync="val" :keyUpHandle.sync="keyUpHandle" :root="`${root}.${key}`" />
      </div>
    </div>
  </div>
</template>

<script>
import checkType from '../assets/utils/checkType.js'

export default {
  name: 'RenderHelper',
  props: {
    data: Object|Array,
    keyUpHandle: Function,
    root: String
  },
  created () {
    console.log(this.data)
  },
  data () {
    return {
    }
  },
  methods: {
    checkType (obj) {
      return checkType(obj)
    },
    arrayStringfiy (arr) {
      return JSON.stringify(arr)
    }
  }
}
</script>

<style scoped lang="less">
</style>
