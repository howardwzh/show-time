<template>
  <div class="items-list" :class="`items-list-${type}`">
    <span class="item" v-for="(valK, index) in itemsKey.split(',')" :key="valK" v-html="makePlanString(valK, index)" />
    <span class="totle" v-html="makeRemainderString()"></span>
  </div>
</template>

<script>
import * as hope from '../assets/utils/hope'
export default {
  name: 'HopeItemsList',
  props: {
    wood:Object,
    box: Object,
    boxTotle: Number,
    itemsVal: Object,
    itemsKey: String,
    type: {
      type: String,
      default: 'totle'
    }
  },
  methods: {
    makePlanString (valK, index) {
      if (!this.itemsVal.plan) return
      const valKArray = valK.split('÷')
      return `${this.box[valKArray[1]]} × ${this.itemsVal.plan[index]} + ${this.wood[valKArray[0]].offset} = ${hope.countWoodResult(this.box[valKArray[1]],this.itemsVal.plan[index],this.wood[valKArray[0]].offset)} &lt; ${this.wood[valKArray[0]].max}<br/>`
    },
    makeRemainderString () {
      if (!this.itemsVal.number) return
      const resultAndRemainder = hope.getResultAndRemainder(this.boxTotle, this.itemsVal.number)
      let remainderString = ''
      if (this.type === 'totle') {
        remainderString = `${this.boxTotle} ÷ ${this.itemsVal.number} = ${resultAndRemainder.result} (Remainder: ${resultAndRemainder.remainder})`
      } else {
        remainderString = `${this.itemsVal.number} - ${this.boxTotle} = ${-1*resultAndRemainder.remainder} (Vacancy)`
      }
      return remainderString
    }
  }
}
</script>

<style lang="less">
.items-list {
  font-size: 14px;
  &-totle {
    .item {
      color: #333;
    }
    .totle {
      color: #0099cc;
    }
  }
  &-remainder {
    .item {
      color: #999;
    }
    .totle {
      color: #55aacc;
    }
  }
}
</style>
