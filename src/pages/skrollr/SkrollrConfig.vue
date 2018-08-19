<template>
  <div id="SkrollrConfig">
    <div class="skrollr-config">
      <SkrollrConfigFormRender :data.sync="skrollrData" root="skrollrData" />
    </div>
    <textarea class="skrollr-code" :value="skrollrHtml" readonly></textarea>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { style } from './assets/data'
import SkrollrConfigFormRender from './SkrollrConfigFormRender'
export default {
  name: 'SkrollrConfig',
  props: {
  },
  created () {
    this['skrollr/initData']()
  },
  data () {
    return {
    }
  },
  components: {
    SkrollrConfigFormRender
  },
  computed: {
    ...mapState({
      skrollrData (state) {
        return state.skrollr.skrollrData
      }
    }),
    skrollrHtml () {
      const domArray = this.skrollrData.scenes.map((scene) => {
        const materialArray = scene.material.map((m) => {
          const picturesPosSStyle = m.pictures.map((p) => {
            const SStyleArray = style.getSStyleArray(p.SStyle)
            return `${p.pos}="${SStyleArray.join(';')}"`
          })
          if (m.tag === 'img') {
            return `<${m.tag} style="${m.style.join(';')}" ${picturesPosSStyle.join(' ')} src="${m.tagConSrc}" />`
          } else {
            return `<${m.tag} style="${m.style.join(';')}" ${picturesPosSStyle.join(' ')}>${m.tagConSrc}</${m.tag}>`
          }
        })
        return (
          `<div class="skrollr-scene" style="${scene.style.join(';')}">\n${materialArray.join('\n')}\n</div>\n\n`
        )
      })
      return domArray.join('')
    }
  },
  methods: {
    ...mapActions([
      'skrollr/initData'
    ]),
    getSkrollrHtml () {
      localStorage.setItem('skrollrData', JSON.stringify(this.skrollrData))
      return this.skrollrHtml
    }
  }
}
</script>

<style lang="less">
.form-render {
  padding: 10px 24px 0 16px;
  background-color: rgba(0, 0, 0, 0.1);
  .item-desc {
    display: none;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    label {
      display: block;
    }
  }
  &:last-child {
    padding-bottom: 10px;
  }
  &.active {
    &>.item-desc {
      display: block;
    }
  }
  .input-wrapper {
    display: flex;
    line-height: 30px;
    span {
      width: 80px;
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input, select, textarea {
      flex: 1;
    }
    textarea {
      height: 60px;
    }
  }
  .tip-icon {
    position: relative;
    &::after {
      content: 'i';
      position: absolute;
      width: 12px;
      height: 12px;
      line-height: 1;
      font-size: 10px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      top: 18px;
      right: 5px;
    }
  }
}
</style>
