<template>
  <div id="CSS3">
    <Wrapper title="Transform">
      <Transform />
    </Wrapper>
    <Wrapper title="Graph">
      <Graph />
    </Wrapper>
  </div>
</template>

<script>
import Transform from './Transform'
import Graph from './Graph'

export default {
  name: 'CSS3',
  components: {
    Transform,
    Graph
  }
}
</script>

<style>
</style>
