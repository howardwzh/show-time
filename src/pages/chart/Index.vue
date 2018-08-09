<template>
  <div id="Chart">
    <Wrapper title="Line">
      <XLine />
      <!-- {{chartData}} -->
    </Wrapper>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

import XLine from './Line'

export default {
  name: 'Chart',
  components: {
    XLine
  },
  computed: {
    // ...mapState([
    //   'chartData'
    // ])
  }
}
</script>

<style>
</style>
