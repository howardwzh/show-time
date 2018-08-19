import _find from 'lodash/find'
import _cloneDeep from 'lodash/cloneDeep'

const styles = [
  {
    name: 'COLOR',
    value: 'color:rgb(0,0,255)',
    checked: false
  },
  {
    name: 'BG_COLOR',
    value: 'background-color:rgb(0,0,255)',
    checked: false
  },
  {
    name: 'ROTATE',
    value: 'transform:rotate(60deg)',
    checked: false
  },
  {
    name: 'TRANSLATE_Y',
    value: 'transform:translateY(0px)',
    checked: false
  },
  {
    name: 'SCALE',
    value: 'transform:scale(2)',
    checked: false
  },
  {
    name: 'SKEW',
    value: 'transform:skew(60deg)',
    checked: false
  },
  {
    name: 'OPACITY',
    value: 'opacity:0.6',
    checked: false
  }
]
const style = {
  init () {
    return _cloneDeep(styles)
  },
  get({ styleType, styleData }) {
    styleData = styleData || styles
    return _find(styleData, (s) => {
      return s.name === styleType
    })
  },
  check({ styleType, styleData }) {
    const keyStyleData = this.get({styleType, styleData})
    return keyStyleData && keyStyleData.checked
  },
  getSStyleArray (SStyleData) {
    const SStyleArray = []
    SStyleData.map((ss) => {
      if (ss && ss.checked) {
        SStyleArray.push(ss.value)
      }
    })
    return SStyleArray
  },
  getStyleType (style) {
    const keyStyle = _find(styles, (s) => {
      const template = s.value.match(/([^:]+\(?)/)[0]
      return style.indexOf(template) === 0
    })
    return keyStyle ? keyStyle.name : 'unknown'
  }
}

export default style
