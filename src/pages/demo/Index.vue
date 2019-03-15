<template>
  <div class="page" id="Demo">
    <Wrapper title="Demo">
      <div>
        <jk-alert ref="woAlert" />
        <button @click="bashAlert">弹窗</button>
        <div class="result">{{status}}</div>
      </div>
    </Wrapper>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      status: '未点击'
    }
  },
  methods: {
    bashAlert () {
      this.status = '打开弹窗'
      this.$refs.woAlert.show({
        title: '弹窗标题',
        text: '这里是演示弹窗内容哦～',
        btns: [{
          text: '确定',
          callback: () => {
            this.status = '关闭弹窗'
          }
        }]
      })
    }
  }
}
</script>

<style lang="less">
</style>

