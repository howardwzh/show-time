<template>
  <div class="style-check">
   <label>
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle('rotate')"
        @change="addStyle('rotate', $event)"
      />
      rotate
    </label>
    <label>
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle('background')"
        @change="addStyle('background', $event)"
      />
      bgColor
    </label>
    <label>
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle('color')"
        @change="addStyle('color', $event)"
      />
      color
    </label>
    <label>
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle('background')"
        @change="addStyle('background', $event)"
      />
      bgColor
    </label>
    <label>
      <input type="checkbox" class="style-checkbox" name="style"
        :checked="isCheckedStyle('background')"
        @change="addStyle('background', $event)"
      />
      bgColor
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
  methods: {
    ...mapActions(['skrollr/addStyle']),
    addStyle (styleType, e) {
      const {pos} = this
      if (e.target.checked) {
        this['skrollr/addStyle']({pos, style: style.get({styleType})})
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
