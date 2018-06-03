<template>
  <div class="wrapper">
    <h5 class="title">{{title}}</h5>
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

<style scoped>
h5.title {
  margin: 20px 0; 
  font-size: 20px;
}
</style>
