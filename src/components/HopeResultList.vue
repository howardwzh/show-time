<template>
  <div class="result-list">
    <ul class="result-list-ul">
      <li v-for="(val, key) in resultObj" :key="key">
        <div class="result-list-ul-info">
          <HopeItemsList
            class="hope-items-list"
            :wood="wood"
            :box="box"
            :boxTotle="boxTotle"
            :itemsVal="val"
            :itemsKey="key"
          />
          <HopeRemainderList
            v-if="getResultAndRemainder(boxTotle, val.number).remainder > 0"
            class="hope-remainder-list"
            :wood="wood"
            :box="box"
            :boxTotle="getResultAndRemainder(boxTotle, val.number).remainder"
            :itemsVal="val"
            :itemsKey="key"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HopeRemainderList from './HopeRemainderList'
import HopeItemsList from './HopeItemsList'
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
    WoInput,
    HopeItemsList
  },
  mounted () {
    setTimeout(this.getResultObj, 200)
  },
  methods: {
    getResultObj () {
      this.resultObj = hope.getEveryPossible(this.wood, this.box)
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
    }
    &-info {
      display: flex;
      .hope-items-list {
        width: 30%;
      }
      .hope-remainder-list {
        width: 70%;
      }
    }
  }
  
  &-remainder-box{
    margin-top: 20px;
  }
}
</style>
