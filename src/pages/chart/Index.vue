<template>
  <div id="ChartIndex">
    <Wrapper title="ChartJS">
      <template slot="other-top-right">
        <a href="http://www.chartjs.org/docs/latest/" target="_blank">ChartJS官网API</a>
      </template>
      <ChartJS />
    </Wrapper>
  </div>
</template>

<script>
import ChartJS from './ChartJS'

export default {
  name: 'ChartIndex',
  components: {
    ChartJS
  },
  computed: {
  }
}
</script>

<style>
</style>
