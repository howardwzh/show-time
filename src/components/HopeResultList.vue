<template>
  <ul class="result-list" v-if="showResult">
    <li v-for="(val, key) in resultObj" :key="key">
      <span class="item" v-for="(valK, index) in key.split(',')" :key="valK" v-html="makePlanString(val, valK, index)">
 
      </span>
      <span class="totle" v-html="makeRemainderString(val)"></span>
      <div class="result-list-remainder-box" v-if="getResultAndRemainder(boxTotle, val.number).remainder > 0">
        <div class="result-list-remainder-box-form">
          <WoInput class="radio" default="1" label="附加限制项" @change.native="handleSwitchRadio(key)" :radioItems="radioItems" type="radio" v-model="allItemFirst[key]"/>
          <WoInput class="input" :readonly="allItemFirst[key] === '1'" label="新高度限制" type="number" v-model="allRemainderLimitZMax[key]"/>
        </div>
        <HopeResultList
          :showResult="true"
          :resultObj="getPlanToPutRemainder(getResultAndRemainder(boxTotle, val.number).remainder,val, key)"
          :wood="allNewWood[key]"
          :box="box"
          :boxTotle="getResultAndRemainder(boxTotle, val.number).remainder"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import _map from 'lodash/map'
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
    showResult: Boolean,
    resultObj: Object,
    wood: Object,
    box: Object,
    boxTotle: Number
  },
  data () {
    return {
      radioItems,
      allNewWood: {},
      allItemFirst: {},
      allRemainderLimitZMax: {},
      getResultAndRemainder: hope.getResultAndRemainder
    }
  },
  components: {
    WoInput
  },
  watch: {
    resultObj: {
      handler: function () {
        _map(this.resultObj, (val, key) => {
          this.allNewWood[key] = _cloneDeep(this.wood)
        })
      },
      deep: true
    }
  },
  methods: {
    handleSwitchRadio (key) {
      if (this.allItemFirst[key] === '1') {
        this.allRemainderLimitZMax[key] = ''
      }
    },
    getPlanToPutRemainder (remainder, val, key) {
      return hope.getPlanToPutRemainder(remainder, this.allNewWood[key], this.box, val, key, this.allItemFirst[key], this.allRemainderLimitZMax[key])
    },
    makePlanString (val, valK, index) {
      const valKArray = valK.split('÷')
      return `${this.box[valKArray[1]]} × ${val.plan[index]} + ${this.wood[valKArray[0]].offset} = ${hope.countWoodResult(this.box[valKArray[1]],val.plan[index],this.wood[valKArray[0]].offset)} &lt; ${this.wood[valKArray[0]].max}<br/>`
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
