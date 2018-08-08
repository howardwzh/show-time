const checkType = (function () {
  const class2type = {}
  // 生成class2type映射
  "Boolean,Number,String,Array,Date,RegExp,Object,Error,Null,Undefined".split(",").map(function(item) {
      class2type["[object " + item + "]"] = item.toLowerCase()
  })
  function _type(obj) {
      if (obj === undefined || obj === null) {
          return String(obj)
      }
      return typeof obj === 'object' ? (class2type[Object.prototype.toString.call(obj)] || 'object') : typeof obj
  }
  return _type
})()

export default checkType