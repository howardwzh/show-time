<template>
  <div class="splice-picture">
    <div class="splice-picture-panel">
      <div id="SplicePictureBox" class="splice-picture-box">
        <h3 class="splice-picture-box-title">{{title}}</h3>
        <div class="splice-picture-box-imgs">
          <img v-for="(p, index) in pictures" :src="p" :key="index" alt="" />
        </div>

      </div>
    </div>
    <label>输入标题<input type="text" v-model="title"/></label><br/>
    <label>增加图片<input type="file" @change="uploadPicture" multiple="multiple"/></label><br/>
    <a :href="imageData" download="拼接图片.jpeg" id="exportLink" class="splice-picture-button">导出拼接图片</a>
  </div>
</template>

<script>
import * as hope from '../../assets/utils/hope'
import html2canvas from 'html2canvas';

export default {
  name: 'SplicePicture',
  data () {
    return {
      title: '标题信息',
      pictures: [],
      imageData: ''
    }
  },
  watch: {
    title () {
      setTimeout(this.exportPicture, 200)
    }
  },
  methods: {
    uploadPicture (e) {
      const self = this
      const files = e.target.files
      hope.getBase64(files).then(filesBase64 => {
        this.pictures = this.pictures.concat(filesBase64)
        setTimeout(self.exportPicture, 200)
      })
    },
    exportPicture () {
      const self = this
      html2canvas(document.querySelector("#SplicePictureBox")).then(function(canvas) {
        self.imageData = canvas.toDataURL('image/jpeg', 0.2);
      });
    }
  }
}
</script>

<style lang="less">
.splice-picture {
  &-panel {
    border: 3px solid #333;
    width: 1600px;
  }
  &-box {
    width: 1600px;
    &-title {
      height: 100px;
      line-height: 90px;
      margin: 0;
      text-align: center;
      font-size: 50px;
    }
    &-imgs {
      min-height: 200px;
      text-align: center;
      img {
        width: 50%;
        vertical-align: top;
      }
    }
    
  }
}
</style>

