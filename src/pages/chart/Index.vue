<template>
  <div id="Chart">
    <Wrapper title="Line">
      <XLine />
    </Wrapper>
  </div>
</template>

<script>
import XLine from './Line'

export default {
  name: 'Chart',
  components: {
    XLine
  }
}
</script>

<style>
</style>
