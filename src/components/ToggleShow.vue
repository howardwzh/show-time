<template>
  <div class="toggle-show">
    <div class="toggle-show-btns">
      <button v-if="this.shouldToggle" @click="toggleHandle()">{{toggleShow ? '收起' : '展开'}}</button>
      <slot name="btns"></slot>
    </div>
    <div v-show="toggleShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleShow',
  props: {
    shouldToggle: Boolean
  },
  data () {
    return {
      toggleShow: true
    }
  },
  methods: {
    toggleHandle () {
      this.toggleShow = !this.toggleShow
    }
  }
}
</script>

<style scoped lang="less">
.toggle-show {
  position: relative;
  &-btns {
    position: absolute;
    top: -22px;
    right: -1px;
  }
}
</style>
