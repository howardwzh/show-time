<template>
  <div id="VUE">
    <Wrapper title="生命周期">
      <LifecycleWrapper />
    </Wrapper>
    <Wrapper title="动态组件">
      <DynamicComponent />
    </Wrapper>
  </div>
</template>

<script>
import LifecycleWrapper from './LifecycleWrapper'
import DynamicComponent from './DynamicComponent'

export default {
  name: 'VUE',
  components: {
    LifecycleWrapper,
    DynamicComponent
  }
}
</script>

<style>
</style>
