<template>
  <ul class="result-list">
    <div class="result-list-remainder-box-form" v-if="type === 'remainder'">
      <WoInput class="radio" default="1" label="附加限制项" :radioItems="radioItems" type="radio" v-model="itemFirst"/>
      <WoInput class="input" :readonly="itemFirst === '1'" label="新高度限制" type="number" v-model="remainderLimitZMax"/>
    </div>
    <li v-for="(val, key) in resultObj" :key="key">
      <span class="item" v-for="(valK, index) in key.split(',')" :key="valK" v-html="makePlanString(val, valK, index, key, remainderLimitZMax)" />
      <span class="totle" v-html="makeRemainderString(val)"></span>
      <div class="result-list-remainder-box"> 
        <HopeResultList
          v-if="getResultAndRemainder(boxTotle, val.number).remainder > 0"
          type="remainder"
          :wood="wood"
          :box="box"
          :boxTotle="getResultAndRemainder(boxTotle, val.number).remainder"
          :totleVal="val"
          :totleKey="key"
        />
      </div>
    </li>
  </ul>
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
  name: 'HopeResultList',
  props: {
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
      allNewWood: {},
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
      if (this.type === 'totle') {
        this.resultObj = hope.getEveryPossible(this.wood, this.box)
      } else {
        this.resultObj = hope.getPlanToPutRemainder(this.boxTotle, this.wood, this.box, this.totleVal, this.totleKey, this.itemFirst, this.remainderLimitZMax)
      }
    },
    makePlanString (val, valK, index, key, remainderLimitZMax) {
      const valKArray = valK.split('÷')
      let tempLimitZMax = this.wood[valKArray[0]].max
      if (valKArray[0] === 'limitZ' && remainderLimitZMax) {
        tempLimitZMax = remainderLimitZMax
      console.log(key)
      }
      return `${this.box[valKArray[1]]} × ${val.plan[index]} + ${this.wood[valKArray[0]].offset} = ${hope.countWoodResult(this.box[valKArray[1]],val.plan[index],this.wood[valKArray[0]].offset)} &lt; ${tempLimitZMax}<br/>`
    },
    makeRemainderString (val) {
      const resultAndRemainder = hope.getResultAndRemainder(this.boxTotle, val.number)
      let remainderString = ''
      if (resultAndRemainder.remainder > 0) {
        remainderString = `${this.boxTotle} ÷ ${val.number} = ${resultAndRemainder.result} (Remainder: ${resultAndRemainder.remainder})`
      } else {
        remainderString = `${val.number} - ${this.boxTotle} = ${-1*resultAndRemainder.remainder} (Vacancy)`
      }
      return remainderString
    }
  }
}
</script>

<style lang="less">
.result-list {
  list-style: none;
  font-size: 14px;
  padding: 0;
  li {
    margin: 20px 0;
    border: 2px solid #ddd;
    padding: 10px 20px;
    .item {

    }
    .totle {
      color: #0099cc;
    }
  }
  &-remainder-box{
    margin-top: 20px;
    li {
      border: none;
      margin: 0;
      padding: 0;
      .item {
        color: #999;
      }
      .totle {
        color: #55aacc;
      }
    }
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
