
const styleTypes = {
  color: 'color:rgb(0,0,255)',
  background: 'background-color:rgb(0,0,255)',
  rotate: 'transform:rotate(60deg)',
  translateY: 'transform:translateY(100px)',
  scale: 'transform:scale(2)',
  skew: 'transform:skew(60deg)',
  opacity: 'opacity:0.6',
}
const style = {
  get ({styleType, options}) {
    console.log(styleType, options)
    console.log(styleTypes[styleType])
    return styleTypes[styleType]
  },
  check ({styleType, styleData}) {
    return styleData.join(',').indexOf(styleType) !== -1
  }
}

export default style