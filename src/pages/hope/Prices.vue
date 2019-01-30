<template>
  <div id="Prices" class="prices">
    <div class="prices-form" :class="{'prices-form-disabled': showResult}">
      <div class="group box-group">
        <wo-input v-for="(item, index) in products" :label="`货物${index+1}`" :key="index" type="number" v-model="products[index]"/>
      </div>
      <button class="wo-button" @click="addProduct">加一条</button>
    </div>
    <button class="wo-button" @click="count">{{showResult ? '重新输入' : '开始计算'}}</button>
  </div>
</template>

<script>
import WoInput from '../../components/WoInput'
import * as hope from '../../assets/utils/hope'
export default {
  name: 'Prices',
  data () {
    return {
      products: [20],
      showResult: false,
      resultObj: {}
    }
  },
  created () {
  },
  components: {
    WoInput
  },
  methods: {
    addProduct () {
      this.products.push(0)
    },
    count () {
      this.showResult = !this.showResult
      this.resultObj = hope.countPrices()
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

