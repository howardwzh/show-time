<template>
  <div id="VUE">
    <Wrapper title="生命周期">
      <LifecycleWrapper />
    </Wrapper>
  </div>
</template>

<script>
import LifecycleWrapper from './LifecycleWrapper'

export default {
  name: 'VUE',
  components: {
    LifecycleWrapper,
  }
}
</script>

<style>
</style>
