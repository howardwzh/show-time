<template>
  <div class="splice-picture">
    <div class="splice-picture-panel">
      <div id="SplicePictureBox" class="splice-picture-box">
        <h3 class="splice-picture-box-title">{{title}}</h3>
        <div class="splice-picture-box-imgs">
            <div class="img-box" v-for="(p, index) in pictures" :key="p.id">
              <img v-if="!myOptions[`${p.id}editable`]" @dblclick="toggleEdit(p.id, $event)" class="img" :src="myOptions[`${p.id}src`] || p.src" />
              <croppa
                v-show="myOptions[`${p.id}editable`]"
                v-if="myOptions[`${p.id}width`]"
                @dblclick="toggleEdit(p.id)"
                v-model="myCroppas[p.id]"
                :show-remove-button="false"
                :width="myOptions[`${p.id}width`]"
                :height="myOptions[`${p.id}height`]"
                :disable-scroll-to-zoom="true"
                >
                <img slot="initial" :src="p.src" />
              </croppa>
              <div v-if="myOptions[`${p.id}editable`]" class="edit-box">
                <el-button size="mini" @click="edit(p.id, 'rotateLeft')">左旋90度</el-button>
                <el-button size="mini" @click="edit(p.id, 'rotateRight')">右旋90度</el-button>
                <!-- <el-button size="mini" @click="edit(p.id, 'flipX')">左右反转</el-button>
                <el-button size="mini" @click="edit(p.id, 'flipY')">上下反转</el-button> -->
                <el-button size="mini" @click="edit(p.id, 'zoomIn')">放大</el-button>
                <el-button size="mini" @click="edit(p.id, 'zoomOut')">缩小</el-button>
                <el-button size="mini" @click="edit(p.id, 'copySize')">修改尺寸</el-button>
                <el-button type="danger" size="small" @click="edit(p.id, 'delete', index)">删除</el-button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <br/>
    <el-form class="form" label-width="80px">
      <el-form-item label="输入标题">
        <el-input v-model="title" @blur="exportPicture"></el-input>
      </el-form-item>
      <el-form-item label="增加图片">
        <el-button type="primary" class="upload-btn">
          <input type="file" @change="uploadPicture" multiple="multiple"/>
          上传图片
        </el-button>
        <p class="edit-tip">双击某图片可切换：编辑功能 / 保存编辑完成图片 </p>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isExporting">
          <i class="el-icon-loading"></i>&nbsp;拼接图片中...
        </el-button>
        <a v-else :href="imageData" download="拼接图片.jpeg" id="exportLink" class="splice-picture-button">
          <el-button type="success">导出拼接图片</el-button>
        </a>
      </el-form-item>
    </el-form>
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
      resizeId: '',
      dialogVisible: false,
      isExporting: false
    }
  },
  components: {
  },
  methods: {
    uploadPicture (e) {
      const files = e.target.files
      hope.getBase64(files).then(filesBase64 => {
        _forEach(filesBase64, src => {
          this.pictures.push({
            id: hope.guid(),
            src
          })
        })
        setTimeout(() => {
          this.exportPicture()
          this.getSize()
        }, 200)
      })
    },
    exportPicture () {
      const self = this
      self.isExporting = true
      html2canvas(document.querySelector("#SplicePictureBox"), {scale: 2}).then(function(canvas) {
        self.imageData = canvas.toDataURL('image/jpeg', 0.36);
        self.isExporting = false
      });
    },
    toggleEdit(id, e) {
      if (!this.myOptions[`${id}width`]) {
        this.$set(this.myOptions, `${id}width`, e.target.width)
        this.$set(this.myOptions, `${id}height`, e.target.height)
      }
      if (this.myOptions[`${id}editable`]) {
        this.myOptions[`${id}src`] = this.myCroppas[id].generateDataUrl('jpeg')
        setTimeout(this.exportPicture, 200)
      }
      this.$set(this.myOptions, `${id}editable`, !this.myOptions[`${id}editable`])
    },
    edit(id, type, index) {
      const myCroppa = this.myCroppas[id]
      if (type === 'rotateLeft') {
        myCroppa.rotate(-1)
      } else if (type === 'rotateRight') {
        myCroppa.rotate(1)
      // } else if (type === 'flipX') {
      //   myCroppa.flipX()
      // } else if (type === 'flipY') {
      //   myCroppa.flipY()
      } else if (type === 'zoomIn') {
        myCroppa.zoomIn()
      } else if (type === 'zoomOut') {
        myCroppa.zoomOut()
      } else if (type === 'copySize') {
        this.dialogVisible = true
        this.resizeId = id
      } else if (type === 'delete') {
        this.pictures.splice(index, 1)
        delete this.myOptions[`${id}editable`]
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
      this.myOptions[`${this.resizeId}width`] = this.sizeGroup[this.sizeIndex].width
      this.myOptions[`${this.resizeId}height`] = this.sizeGroup[this.sizeIndex].height
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less">
.splice-picture {
  &-panel {
    border: 3px solid #333;
    width: 1200px;
  }
  &-box {
    width: 1200px;
    &-title {
      line-height: 40px;
      margin: 0;
      text-align: center;
      font-size: 36px;
      padding: 8px 10px 22px;
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
    cursor: pointer;
  }
  .form {
    width: 500px;
    .upload-btn {
      position: relative;
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
      }
    }
  }
}
</style>

