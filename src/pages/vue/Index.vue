<template>
  <div id="VUE">
    <Wrapper title="生命周期">
      <LifecycleWrapper />
    </Wrapper>
    <Wrapper title="动态组件">
      <DynamicComponent />
    </Wrapper>
    <Wrapper title="异步加载">
      <AsyncComponent />
    </Wrapper>
  </div>
</template>

<script>
import LifecycleWrapper from './LifecycleWrapper'
import DynamicComponent from './DynamicComponent'
import AsyncComponent from './AsyncComponent'

export default {
  name: 'VUE',
  components: {
    LifecycleWrapper,
    DynamicComponent,
    AsyncComponent
  }
}
</script>

<style>
</style>
