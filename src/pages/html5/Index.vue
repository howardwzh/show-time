<template>
  <div id="HTML5">
    <Wrapper title="Notification">
      <Notification />
    </Wrapper>
    <Wrapper title="Canvas">
      <Canvas />
    </Wrapper>
    <Wrapper title="Audio & Video">
      <AudioVideo />
    </Wrapper>
  </div>
</template>

<script>
import Notification from './Notification'
import Canvas from './Canvas'
import AudioVideo from './AudioVideo'

export default {
  name: 'HTML5',
  components: {
    Notification,
    Canvas,
    AudioVideo
  }
}
</script>

<style>
</style>
