<template>
  <div class="splice-picture">
    <div class="splice-picture-panel">
      <div id="SplicePictureBox" class="splice-picture-box">
        <h3 class="splice-picture-box-title">{{title}}</h3>
        <div class="splice-picture-box-imgs">
            <div class="img-box" v-for="(p, index) in pictures" :key="p.slice(-20, -10)" :width="myOptions[`${index}width`]" :height="myOptions[`${index}height`]">
              <img v-if="!myOptions[`${index}editable`]" @dblclick="toggleEdit(index, $event)" class="img" :src="myOptions[`${index}src`] || p" />
              <croppa
                v-show="myOptions[`${index}editable`]"
                v-if="myOptions[`${index}width`]"
                @dblclick="toggleEdit(index)"
                v-model="myCroppas[index]"
                :show-remove-button="false"
                :width="myOptions[`${index}width`]"
                :height="myOptions[`${index}height`]"
                >
                <img slot="initial" :src="p" />
              </croppa>
              <div v-if="myOptions[`${index}editable`]" class="edit-box">
                <el-button size="small" @click="edit(index, 'rotate')">旋转90度</el-button>
                <el-button size="small" @click="edit(index, 'flipX')">左右反转</el-button>
                <el-button size="small" @click="edit(index, 'flipY')">上下反转</el-button>
                <el-button size="small" @click="edit(index, 'zoomIn')">放大</el-button>
                <el-button size="small" @click="edit(index, 'zoomOut')">缩小</el-button>
                <el-button size="small" @click="edit(index, 'copySize')">复制尺寸</el-button>
                <el-button type="danger" size="small" @click="edit(index, 'delete')">删除</el-button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <br/>
    <label>输入标题<input type="text" v-model="title"/></label><br/><br/>
    <label>增加图片<input type="file" @change="uploadPicture" multiple="multiple"/></label>
    <p class="edit-tip">双击某图片可切换：编辑功能 / 保存编辑完成图片 </p><br/>
    <a :href="imageData" download="拼接图片.jpeg" id="exportLink" class="splice-picture-button"><el-button type="primary">导出拼接图片</el-button></a>
    <el-dialog
      :visible.sync="dialogVisible"
      title="请选择使用的图片尺寸"
      width="30%">
      <el-row>
        <el-tag class="size-tag" v-for="(size, index) in sizeGroup" :key="index" :type="sizeIndex === index ? 'success' : ''" @click="sizeIndex = index">
          {{`${size.width} x ${size.height}`}}
        </el-tag>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resize">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as hope from '../../assets/utils/hope'
import html2canvas from 'html2canvas';
import _forEach from 'lodash/forEach'
import _uniqWith from 'lodash/uniqWith'
import _isEqual from 'lodash/isEqual'

export default {
  name: 'SplicePicture',
  data () {
    return {
      title: '标题信息',
      pictures: [],
      imageData: '',
      myCroppas: {},
      myOptions: {},
      sizeGroup: [],
      sizeIndex: -1,
      resizeIndex: -1,
      dialogVisible: false
    }
  },
  components: {
  },
  watch: {
    title () {
      setTimeout(this.exportPicture, 200)
    }
  },
  methods: {
    uploadPicture (e, file) {
      const self = this
      let files
      if (file) {
        files = [file]
      } else {
        files = e.target.files
      }
      hope.getBase64(files).then(filesBase64 => {
        this.pictures = this.pictures.concat(filesBase64)
        setTimeout(() => {
          self.exportPicture()
          self.getSize()
        }, 200)
      })
    },
    exportPicture () {
      const self = this
      html2canvas(document.querySelector("#SplicePictureBox")).then(function(canvas) {
        self.imageData = canvas.toDataURL('image/jpeg', 0.2);
      });
    },
    toggleEdit(index, e) {
      if (!this.myOptions[`${index}width`]) {
        this.$set(this.myOptions, `${index}width`, e.target.width)
        this.$set(this.myOptions, `${index}height`, e.target.height)
      }
      if (this.myOptions[`${index}editable`]) {
        this.myOptions[`${index}src`] = this.myCroppas[index].generateDataUrl()
        setTimeout(this.exportPicture, 200)
      }
      this.$set(this.myOptions, `${index}editable`, !this.myOptions[`${index}editable`])
    },
    edit(index, type) {
      const myCroppa = this.myCroppas[index]
      if (type === 'rotate') {
        myCroppa.rotate(-1)
      } else if (type === 'flipX') {
        myCroppa.flipX()
      } else if (type === 'flipY') {
        myCroppa.flipY()
      } else if (type === 'zoomIn') {
        myCroppa.zoomIn()
      } else if (type === 'zoomOut') {
        myCroppa.zoomOut()
      } else if (type === 'copySize') {
        this.dialogVisible = true
        this.resizeIndex = index
      } else if (type === 'delete') {
        this.pictures.splice(index, 1)
        delete this.myOptions[`${index}editable`]
        setTimeout(() => {
          this.exportPicture()
          this.getSize()
        }, 200)
      }
    },
    getSize() {
      const sizeGroup = []
      const imgs = document.getElementsByClassName('img')
      _forEach(imgs, img => {
        sizeGroup.push({
          width: img.offsetWidth,
          height: img.offsetHeight
        })
      })
      this.sizeGroup = _uniqWith(sizeGroup, _isEqual)
    },
    resize() {
      this.myOptions[`${this.resizeIndex}width`] = this.sizeGroup[this.sizeIndex].width
      this.myOptions[`${this.resizeIndex}height`] = this.sizeGroup[this.sizeIndex].height
      this.dialogVisible = false
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img-box {
        margin: 0 auto;
        width: 50%;
        position: relative;
        .img {
          width:100%;
          vertical-align: top;
        }
        .edit-box {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          .edit-status {
            background-color: #fff;
            margin-right: 20px;
          }
        }
        canvas {
          vertical-align: top;
        }
      }
    }
    
  }
  .edit-tip {
    font-size: 12px;
    color: #409eff;
    margin: 0;
  }
  .size-tag {
    margin: 6px 3px;
  }
}
</style>

