<template>
  <div>
    <div class="form-render" v-for="(val, key) in data" :key="key">
      <div v-if="!(/array|object/).test(checkType(val)) && key !== 'type'">
        <label>{{key}}: <input type="text" :value="val" @keyup="updateData({pos: `${root}.${key}`, val: $event.target.value})"/></label>
      </div>
      <div v-else-if="checkType(val) === 'object'">
        <label>{{key}}: </label>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/array|object/).test(checkType(val[0]))">
        <label>{{key}}: <input type="text" :value="arrayStringfiy(val)" @keyup="updateData({pos: `${root}.${key}`, val: $event.target.value})"/></label>
      </div>
      <div v-else-if="checkType(val) === 'array' && checkType(val[0]) === 'object'">
        <label>{{key}}: </label><button @click="addData({pos: `${root}.${key}`})">+</button>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import checkType from '../../assets/utils/checkType.js'

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
      return JSON.stringify(arr)
    }
  }
}
</script>

<style lang="less">
</style>
