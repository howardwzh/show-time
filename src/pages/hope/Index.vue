<template>
  <div class="page" id="Hope">
    <h2>Hope的工具箱</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片拼接" name="SplicePicture"><SplicePicture /></el-tab-pane>
      <el-tab-pane label="木托计算" name="Wood"><Wood /></el-tab-pane>
      <el-tab-pane label="价格计算（未完成）" name="Prices"><Prices /></el-tab-pane>
    </el-tabs>
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
      activeName: 'SplicePicture'
    }
  },
  components: {
    Prices,
    Wood,
    SplicePicture
  },
  methods: {
  }
}
</script>

<style lang="less">
.page {
  padding: 20px;
}
</style>

