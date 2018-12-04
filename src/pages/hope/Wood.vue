<template>
  <div id="Wood" class="wood">
    <div class="wood-container">
      <wo-input label="货柜长度限制" type="number" :value="container.maxX" readonly/>
      <wo-input label="货柜宽度限制" type="number" :value="container.maxY" readonly/>
      <wo-input label="货柜高度限制" type="number" :value="container.maxZ" readonly/>
    </div>
    <div class="wood-form" :class="{'wood-form-disabled': showResult}">
      <div class="group wood-group">
      <wo-input label="木托长度限制" type="number" v-model="wood.limitX.max"/>
      <wo-input label="木托宽度限制" type="number" v-model="wood.limitY.max"/>
      <wo-input label="木托高度限制" type="number" v-model="wood.limitZ.max"/>
      </div>
      <div class="group box-group">
        <wo-input label="箱子数量boxTotle" type="number" v-model="boxTotle"/>
        <wo-input label="箱子长度" type="number" v-model="box.valueX"/>
        <wo-input label="箱子宽度" type="number" v-model="box.valueY"/>
        <wo-input label="箱子高度" type="number" v-model="box.valueZ"/>
      </div>
    </div>
    <button class="wo-button" @click="count">{{showResult ? '重新输入' : '开始计算'}}</button>
    <HopeResultList
      v-if="showResult"
      :wood="wood"
      :box="box"
      :boxTotle="boxTotle"
      :container="container"
    />
  </div>
</template>

<script>
import WoInput from '../../components/WoInput'
import HopeResultList from '../../components/HopeResultList'
import * as hope from '../../assets/utils/hope'
export default {
  name: 'Wood',
  data () {
    return {
      showResult: false,
      container: {
        maxX: 5,
        maxY: 2.5,
        maxZ: 2.5
      },
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
    WoInput,
    HopeResultList
  },
  methods: {
    count () {
      this.showResult = !this.showResult
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

</style>

