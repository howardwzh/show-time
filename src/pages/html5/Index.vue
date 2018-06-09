<template>
  <div id="HTML5">
    <Wrapper title="Notification">
      <Notification />
    </Wrapper>
    <Wrapper title="Canvas">
      <Canvas />
    </Wrapper>
  </div>
</template>

<script>
import Notification from './Notification'
import Canvas from './Canvas'

export default {
  name: 'HTML5',
  components: {
    Notification,
    Canvas
  }
}
</script>

<style>
</style>
