<template>
  <div id="Wood" class="wood">
    <div class="wood-form" :class="{'wood-form-disabled': showResult}">
      <div class="group wood-group">
      <wo-input label="木托长度limitX" type="number" v-model="wood.limitX.max"/>
      <wo-input label="木托宽度limitY" type="number" v-model="wood.limitY.max"/>
      <wo-input label="木托高度limitZ" type="number" v-model="wood.limitZ.max"/>
    </div>
    <div class="group box-group">
    <wo-input label="箱子数量boxTotle" type="number" v-model="boxTotle"/>
    <wo-input label="箱子长度valueX" type="number" v-model="box.valueX"/>
    <wo-input label="箱子宽度valueY" type="number" v-model="box.valueY"/>
    <wo-input label="箱子高度valueZ" type="number" v-model="box.valueZ"/>
    </div>
    </div>
    <button class="wo-button" @click="count">{{showResult ? '重新输入' : '开始计算'}}</button>
    <ul class="result-list" v-if="showResult">
      <li v-for="(val, key) in resultObj" :key="key">
        <span class="item" v-for="(valK, index) in key.replace('init,', '').split(',')" :key="valK">
          {{`${box[valK.split('÷')[1]]} x ${val.plan[index]} + ${wood[valK.split('÷')[0]].offset} = ${(box[valK.split('÷')[1]]*val.plan[index]*10000+wood[valK.split('÷')[0]].offset*10000)/10000} &lt; ${wood[valK.split('÷')[0]].max}`}}<br/>
        </span>
        <span class="totle">{{`${boxTotle} ÷ ${val.number} = ${getResultAndRemainder(boxTotle, val.number).result} (remainder: ${getResultAndRemainder(boxTotle, val.number).remainder})`}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import WoInput from '../../components/WoInput'
import * as hope from '../../assets/utils/hope'
export default {
  name: 'Wood',
  data () {
    return {
      showResult: false,
      wood: {
        limitX: {
          max: 1.5,
          offset: 0.03
        },
        limitY: {
          max: 1.15,
          offset: 0.03
        },
        limitZ: {
          max: 1.5,
          offset: 0.15
        }
      },
      box: {
        valueX: 0.31,
        valueY: 0.3,
        valueZ: 0.395,
      },
      boxTotle: 188,
      resultObj: {}
    }
  },
  created () {
  },
  components: {
    WoInput
  },
  methods: {
    count () {
      this.showResult = !this.showResult
      if (this.showResult) {
        this.resultObj = hope.getEveryPossible(this.wood, this.box)
      }
    },
    getResultAndRemainder (dividend, divisor) {
      return hope.getResultAndRemainder(dividend, divisor)
    }
  }
}
</script>

<style lang="less">
.wood-form {
  position: relative;
  &-disabled::after {
    content: ' ';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255,255,255,.7);
  }
}
.wo-button {
  width: 100%;
  height: 36px;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  margin-top: 20px;
  background-color: #ff6817;
  color: #fff;
  border: none;
}
.result-list {
  list-style: none;
  font-size: 14px;
  padding: 0;
  li {
    margin: 20px 0;
    .item {

    }
    .totle {
      color: #0099cc;
    }
  }
}
</style>

