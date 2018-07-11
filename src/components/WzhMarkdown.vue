<template>
  <div class="wzh-markdown">
    <mavonEditor
      defaultOpen="preview"
      :value="source"
      :subfield="false"
      :toolbarsFlag="false"
      :boxShadow="false"
    />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'

export default {
  name: 'WzhMarkdown',
  data () {
    return {
      source: ''
    }
  },
  components: {
    mavonEditor
  },
  mounted () {
    this.source = this.$slots.default[0].children[0].text
  }
}
</script>

<style scoped lang="less">
.wzh-markdown {
  margin: 20px 0;
  .v-note-wrapper {
    min-height: 100px;
  }
}
</style>
