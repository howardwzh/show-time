<template>
  <div class="wrapper">
    <div class="wrapper-top">
      <h5 class="wrapper-top-title">{{title}}</h5>
      <div class="wrapper-top-right"><slot name="other-top-right"></slot></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    title: String
  }
}
</script>

<style scoped lang="less">
.wrapper-top {
  display: flex;
  padding: 0 10px;
  line-height: 50px;
  &-title {
    margin: 20px 0; 
    font-size: 20px;
    display: inline-block;
  }
  &-right {
    flex: 1;
    margin: 20px 0; 
    text-align: right;
  }
}
</style>
