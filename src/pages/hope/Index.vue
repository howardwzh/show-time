<template>
  <div class="page" id="Hope">
    <h2>Hope的工具箱</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片拼接" name="SplicePicture"><SplicePicture /></el-tab-pane>
      <!-- <el-tab-pane label="木托计算" name="Wood"><Wood /></el-tab-pane>
      <el-tab-pane label="价格计算（未完成）" name="Prices"><Prices /></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import SplicePicture from './SplicePicture'
// import Wood from './Wood'
// import Prices from './Prices'
export default {
  name: 'Hope',
  data () {
    return {
      activeName: 'SplicePicture'
    }
  },
  components: {
    SplicePicture
    // Wood,
    // Prices
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

