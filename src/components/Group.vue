<template>
  <div class="group">
    <h5 class="title">{{title}}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Group',
  props: {
    title: String
  }
}
</script>

<style scoped lang="less">
.group {
  border: 1px solid #ccc;
  margin: 20px 0;
  padding: 20px;
  h5.title {
    margin: 0; 
    font-size: 16px;
  }
}
</style>
