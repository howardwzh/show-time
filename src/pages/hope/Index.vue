<template>
  <div class="page" id="Hope">
    <h2>Tools of Hope</h2>
    <div>
      <button @click="switchTool('prices')">Prices</button>
      <button @click="switchTool('wood')">Wood</button>
      <button @click="switchTool('SplicePicture')">SplicePicture</button>
    </div>
    <Prices v-if="currentTool === 'prices'" />
    <Wood v-if="currentTool === 'wood'" />
    <SplicePicture v-if="currentTool === 'SplicePicture'" />
  </div>
</template>

<script>
import Prices from './Prices'
import Wood from './Wood'
import SplicePicture from './SplicePicture'
export default {
  name: 'Hope',
  data () {
    return {
      currentTool: 'SplicePicture'
    }
  },
  components: {
    Prices,
    Wood,
    SplicePicture
  },
  methods: {
    switchTool (tool) {
      this.currentTool = tool
    }
  }
}
</script>

<style lang="less">
.page {
  padding: 20px;
}
</style>

