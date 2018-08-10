<template>
  <div>
    <div class="form-render" v-for="(val, key) in data" :key="key">
      <div v-if="!(/array|object/).test(checkType(val)) && key !== 'type'">
        <label>{{key}}: <input type="text" :value="val" @keyup="updateData({pos: `${root}.${key}`, val: $event.target.value})"/></label>
        <div class="item-desc" v-if="getDescFromKey(`${root}.${key}`)">
          <label v-for="(dv, dk) in getDescFromKey(`${root}.${key}`)" :key="dk">
            {{dk}}: <span>{{dv}}</span>
          </label>
        </div>
      </div>
      <div v-else-if="checkType(val) === 'object'">
        <label>{{key}}: </label>
        <div class="item-desc" v-if="getDescFromKey(`${root}.${key}`)">
          <label v-for="(dv, dk) in getDescFromKey(`${root}.${key}`)" :key="dk">
            {{dk}}: <span>{{dv}}</span>
          </label>
        </div>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
      </div>
      <div v-else-if="checkType(val) === 'array' && !(/array|object/).test(checkType(val[0]))">
        <label>{{key}}: <input type="text" :value="arrayStringfiy(val)" @keyup="updateData({pos: `${root}.${key}`, val: $event.target.value})"/></label>
        <div class="item-desc" v-if="getDescFromKey(`${root}.${key}`)">
          <label v-for="(dv, dk) in getDescFromKey(`${root}.${key}`)" :key="dk">
            {{dk}}: <span>{{dv}}</span>
          </label>
        </div>
      </div>
      <div v-else-if="checkType(val) === 'array' && checkType(val[0]) === 'object'">
        <label>{{key}}: </label><button @click="addData({pos: `${root}.${key}`})">+</button>
        <div class="item-desc" v-if="getDescFromKey(`${root}.${key}`)">
          <label v-for="(dv, dk) in getDescFromKey(`${root}.${key}`)" :key="dk">
            {{dk}}: <span>{{dv}}</span>
          </label>
        </div>
        <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
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
      return JSON.stringify(arr)
    },
    getDescFromKey (key) {
      return desc[key.replace(/\.\d/g, '')]
    }
  }
}
</script>

<style lang="less">
</style>
