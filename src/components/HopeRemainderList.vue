<template>
  <div class="remainder-list">
    <div class="remainder-list-remainder-box-form">
      <WoInput class="radio" default="1" label="附加限制项" :radioItems="radioItems" type="radio" v-model="itemFirst"/>
      <WoInput class="input" :readonly="itemFirst === '1'" label="新高度限制" type="number" v-model="remainderLimitZMax"/>
    </div>
    <div class="remainder-list-box">
      <HopeItemsList
        :wood="wood"
        :box="box"
        :boxTotle="boxTotle"
        :itemsVal="newItemsVal"
        :itemsKey="itemsKey"
        type="remainder"
      />
    </div>
  </div>
</template>

<script>
import WoInput from './WoInput'
import HopeItemsList from './HopeItemsList'
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
    itemsVal: Object,
    itemsKey: String
  },
  data () {
    return {
      newItemsVal: {},
      radioItems,
      itemFirst: '1',
      remainderLimitZMax: null,
      getResultAndRemainder: hope.getResultAndRemainder
    }
  },
  components: {
    WoInput,
    HopeItemsList
  },
  mounted () {
    setTimeout(this.getNewItemsVal, 200)
  },
  watch: {
    remainderLimitZMax () {
      this.getNewItemsVal()
    },
    itemFirst (val) {
      if (val === '1') {
        this.remainderLimitZMax = null
      }
      this.getNewItemsVal()
    }
  },
  methods: {
    getNewItemsVal () {
      this.newItemsVal = hope.getPlanToPutRemainder(this.boxTotle, this.wood, this.box, this.itemsVal, this.itemsKey, this.itemFirst, this.remainderLimitZMax)
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
  }
  
  &-remainder-box{
    &-form {
      display: flex;
      .radio {
        width: 50%;
        .wo-input-label {
          width: 30%;
        }
        .wo-input-area {
          width: auto;
        }
      }
      .input {
        width: 50%;
      }
    }
  }
}
</style>
