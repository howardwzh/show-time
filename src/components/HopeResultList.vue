<template>
  <div class="result-list">
    <ul class="result-list-ul">
      <li v-for="(val, key) in resultObj" :key="key">
        <span class="item" v-for="(valK, index) in key.split(',')" :key="valK" v-html="makePlanString(val, valK, index)" />
        <span class="totle" v-html="makeRemainderString(val)"></span>
        <div class="result-list-remainder-box" v-if="getResultAndRemainder(boxTotle, val.number).remainder > 0"> 
          <HopeRemainderList
            :wood="wood"
            :box="box"
            :boxTotle="getResultAndRemainder(boxTotle, val.number).remainder"
            :totleVal="val"
            :totleKey="key"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HopeRemainderList from './HopeRemainderList'
import WoInput from './WoInput'
import * as hope from '../assets/utils/hope'
export default {
  name: 'HopeResultList',
  props: {
    container: Object,
    wood: Object,
    box: Object,
    boxTotle: Number,
    totleVal: Object,
    totleKey: String
  },
  data () {
    return {
      resultObj: {},
      getResultAndRemainder: hope.getResultAndRemainder
    }
  },
  components: {
    HopeRemainderList,
    WoInput
  },
  mounted () {
    setTimeout(this.getResultObj, 200)
  },
  methods: {
    getResultObj () {
      this.resultObj = hope.getEveryPossible(this.wood, this.box)
    },
    makePlanString (val, valK, index) {
      const valKArray = valK.split('÷')
      return `${this.box[valKArray[1]]} × ${val.plan[index]} + ${this.wood[valKArray[0]].offset} = ${hope.countWoodResult(this.box[valKArray[1]],val.plan[index],this.wood[valKArray[0]].offset)} &lt; ${this.wood[valKArray[0]].max}<br/>`
    },
    makeRemainderString (val) {
      const resultAndRemainder = hope.getResultAndRemainder(this.boxTotle, val.number)
      let remainderString = `${this.boxTotle} ÷ ${val.number} = ${resultAndRemainder.result} (Remainder: ${resultAndRemainder.remainder})`
      return remainderString
    }
  }
}
</script>

<style lang="less">
.result-list {
  font-size: 14px;
  &-ul {
    list-style: none;
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
  }
  
  &-remainder-box{
    margin-top: 20px;
  }
}
</style>
