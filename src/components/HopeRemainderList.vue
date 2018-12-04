<template>
  <div class="remainder-list">
    <div class="remainder-list-remainder-box-form">
      <WoInput class="radio" default="1" label="附加限制项" :radioItems="radioItems" type="radio" v-model="itemFirst"/>
      <WoInput class="input" :readonly="itemFirst === '1'" label="新高度限制" type="number" v-model="remainderLimitZMax"/>
    </div>
    <div class="remainder-list-box">
        <span class="item" v-for="(valK, index) in totleKey.split(',')" :key="valK" v-html="makePlanString(valK, index)" />
        <span class="totle" v-html="makeRemainderString()"></span>
    </div>
  </div>
</template>

<script>
import WoInput from './WoInput'
import * as hope from '../assets/utils/hope'
const radioItems = [{
  value: '1',
  label: '长度优先'
}, {
  value: '2',
  label: '高度优先'
}]
export default {
  name: 'HopeRemainderList',
  props: {
    container: Object,
    wood: Object,
    box: Object,
    boxTotle: Number,
    type: String,
    totleVal: Object,
    totleKey: String
  },
  data () {
    return {
      resultObj: {},
      radioItems,
      itemFirst: '1',
      remainderLimitZMax: null,
      getResultAndRemainder: hope.getResultAndRemainder
    }
  },
  components: {
    WoInput
  },
  mounted () {
    setTimeout(this.getResultObj, 200)
  },
  watch: {
    remainderLimitZMax () {
      this.getResultObj()
    },
    itemFirst (val) {
      if (val === '1') {
        this.remainderLimitZMax = null
      }
      this.getResultObj()
    }
  },
  methods: {
    getResultObj () {
      this.resultObj = hope.getPlanToPutRemainder(this.boxTotle, this.wood, this.box, this.totleVal, this.totleKey, this.itemFirst, this.remainderLimitZMax)
    },
    makePlanString (valK, index) {
      if (!this.resultObj.plan) return
      const valKArray = valK.split('÷')
      let tempLimitZMax = this.wood[valKArray[0]].max
      if (valKArray[0] === 'limitZ' && this.remainderLimitZMax) {
        tempLimitZMax = this.remainderLimitZMax
      }
      return `${this.box[valKArray[1]]} × ${this.resultObj.plan[index]} + ${this.wood[valKArray[0]].offset} = ${hope.countWoodResult(this.box[valKArray[1]],this.resultObj.plan[index],this.wood[valKArray[0]].offset)} &lt; ${tempLimitZMax}<br/>`
    },
    makeRemainderString () {
      if (!this.resultObj.number) return
      const resultAndRemainder = hope.getResultAndRemainder(this.boxTotle, this.resultObj.number)
      let remainderString = `${this.resultObj.number} - ${this.boxTotle} = ${-1*resultAndRemainder.remainder} (Vacancy)`
      return remainderString
    }
  }
}
</script>

<style lang="less">
.remainder-list {
  font-size: 14px;
  &-box {
    list-style: none;
    padding: 0;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-top: none;
    .item {
      color: #999;
    }
    .totle {
      color: #55aacc;
    }
  }
  
  &-remainder-box{
    &-form {
      display: flex;
      .checkbox {
        width: 30%;
        .wo-input-label {
          width: 100%;
        }
        .wo-input-area {
          width: auto;
        }
      }
      .input {

      }
    }
  }
}
</style>
