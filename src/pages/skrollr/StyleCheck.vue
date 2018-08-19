<template>
  <div class="style-check">
    <label v-for="style in styles" :key="style.name">
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle(style.name)"
        @change="toggleStyle(style.name, $event)"
      />
      {{style.name}}
    </label>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {style} from './assets/data'
export default {
  name: 'StyleCheck',
  props: {
    pos: String,
    styleData: Array
  },
  data () {
    return {
      styles: style.init()
    }
  },
  methods: {
    ...mapActions([
      'skrollr/addStyle',
      'skrollr/deleteStyle'
      ]),
    toggleStyle (styleType, e) {
      const {pos} = this
      if (e.target.checked) {
        this['skrollr/addStyle']({pos, styleType})
      } else {
        this['skrollr/deleteStyle']({pos, styleType})
      }
    },
    isCheckedStyle (styleType) {
      const {styleData} = this
      return style.check({styleType, styleData})
    }
  }
}
</script>

<style lang="less">

</style>
