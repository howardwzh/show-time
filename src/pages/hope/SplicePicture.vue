<template>
  <div class="splice-picture">
    <div id="SplicePictureBox" class="splice-picture-box">
      <h3 class="splice-picture-box-title">{{title}}</h3>
      <div class="splice-picture-box-imgs">
        <img v-for="(p, index) in pictures" :src="p" :key="index" alt="" />
      </div>
    </div>
    <label>输入标题<input type="text" v-model="title"/></label>
    <label>增加图片<input type="file" @change="uploadPicture"/></label>
    <a :href="imgData" download="拼接图片.png" class="splice-picture-button">导出拼接图片</a>
  </div>
</template>

<script>
import * as hope from '../../assets/utils/hope'
import html2canvas from 'html2canvas';

export default {
  name: 'SplicePicture',
  data () {
    return {
      title: '标题',
      pictures: [],
      imgData: '',
      download: ''
    }
  },
  created () {
  },
  components: {
  },
  methods: {
    uploadPicture (e) {
      const self = this
      const file = e.target.files[0]
      hope.getBase64(file).then(fileBase64 => {
        this.pictures.push(fileBase64)
        setTimeout(self.exportPicture, 200)
      })
    },
    exportPicture () {
      const self = this
      html2canvas(document.querySelector("#SplicePictureBox")).then(function(canvas) {
        self.imgData = canvas.toDataURL();
      });
    }
  }
}
</script>

<style lang="less">
.splice-picture {
  &-box {
    width: 1600px;
    border: 3px solid #333;
   
    flex-direction: round;
    &-title {
      height: 100px;
      line-height: 100px;
      margin: 0;
      text-align: center;
      font-size: 60px;
    }
    &-imgs {
      min-height: 500px;
      text-align: center;
      img {
        width: 50%;
        vertical-align: top;
      }
    }
    
  }
}
</style>

