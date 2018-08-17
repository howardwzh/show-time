<template>
  <div>
    <div @click.self="formRenderClickHandle($event)" class="form-render" :class="{'tip-icon': getDescFromKey(`${root}.${key}`)}" v-for="(val, key) in data" :key="key">
        <div v-if="!(/array|object/).test(checkType(val))">
          <label class="input-wrapper"><span>{{key}}: </span>
          <input type="text" :value="checkType(val) === 'function' ? 'function' : val" :disabled="checkType(val) === 'function'" @keyup="updateDataHandle(`${root}.${key}`, $event)"/></label>  
          <input v-if="val==='img'" type="file" @change="updateImgSrcHandle(`${root}.tagConSrc`, $event)" />
        </div>
        <div v-else-if="checkType(val) === 'object'">
          <div>
            <label>{{key}}: </label>
            <ToggleShow :shouldToggle="checkType(data) === 'array'" >
              <ChartConfigFormRender :data.sync="val" :root="`${root}.${key}`" />
            </ToggleShow>
          </div>
        </div>
        <div v-else-if="checkType(val) === 'array' && !(/object|array/).test(checkType(val[0]))">
          <label class="input-wrapper"><span>{{key}}: </span> [<textarea type="text" :value="arrayStringfiy(val)" @keyup="updateArrayDataHandle(`${root}.${key}`, $event)"></textarea>]</label>
        </div>
        <div v-else-if="checkType(val) === 'array' && (/object|array/).test(checkType(val[0]))">  
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
import { desc } from './assets/data'
import { isNumber, isColor } from './assets/validate'
import ToggleShow from '../../components/ToggleShow'
// 因为变量路径不能直接require进来，所以采用require.context
// 缺点是：如果images里有冗余图片，webpack也会打包进来
const images = require.context('./assets/images', true, /\.webp|jpg|png|gif$/)

export default {
  name: 'ChartConfigFormRender',
  props: {
    data: Array | Object,
    root: String
  },
  created() {},
  data() {
    return {
      toggleHide: {}
    }
  },
  components: {
    ToggleShow
  },
  methods: {
    ...mapActions(['skrollr/updateData', 'skrollr/addData']),
    addData(pos) {
      this['skrollr/addData']({ pos })
    },
    updateDataHandle(pos, e) {
      const val = e.target.value
      this['skrollr/updateData']({ pos, val })
    },
    updateArrayDataHandle(pos, e) {
      const str = e.target.value
      const arr = str.split('\n')
      const arrLength = arr.length
      if (isNumber(arr[0]) && !isNumber(arr[arrLength - 1])) {
        return
      } else if (isColor(arr[0]) && !isColor(arr[arrLength - 1])) {
        return
      }
      this['skrollr/updateData']({ pos, val: arr })
    },
    checkType(obj) {
      return checkType(obj)
    },
    arrayStringfiy(arr) {
      return arr.join('\n')
    },
    getDescFromKey (key) {
      return desc[key.replace(/\.\d/g, '')]
    },
    formRenderClickHandle(e) {
      const className = e.target.className
      const newClassName = /active/.test(className)
        ? className.replace(/ active/, '')
        : `${className} active`
      e.target.className = newClassName
    },
    updateImgSrcHandle (pos, e) {
      const imgName = e.target.value.match(/[^\\/]+$/)[0]
      this['skrollr/updateData']({ pos, val: images(`./${imgName}`) })
    }
  }
}
</script>

<style lang="less">
</style>
