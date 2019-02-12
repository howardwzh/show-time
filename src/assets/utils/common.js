// 时间处理格式：yyyy-mm-dd
export function sliceTime(val) {
  return (val || '').slice(0, 10)
}
// 金额处理：xxxx.xx
export function decimal(val) {
  // val = new Number(val)
  if (val !== 0) {
    val = Math.round(val * 100) / 100
  }
  return val.toFixed(2)
}

/**
 * 对象数据 转换成 数组
 * @param {Object|String} val
 * @param {Object} dictionary
 */
export function objectToArrayForTable(val, dictionary) {
  if (getType(val) !== 'object') return val

  const tableArray = []
  for (var i = 0; i < dictionary.length; i++) {
    if (!/tableLabel|tableValue/.test(getTableKey(dictionary[i])) && val[getTableKey(dictionary[i])] !== undefined) {
      tableArray.push({
        tableLabel: getTableLabel(dictionary[i]),
        tableValue: val[getTableKey(dictionary[i])]
      })
    }
  }
  return tableArray
}

export const getType = (function() {
  const class2type = {}
  // 生成class2type映射
  'Boolean,Number,String,Array,Date,RegExp,Object,Error,Null,Undefined'.split(',').map(function(item) {
    class2type['[object ' + item + ']'] = item.toLowerCase()
  })
  function _type(obj) {
    if (obj === undefined || obj === null) {
      return String(obj)
    }
    return typeof obj === 'object' ? (class2type[Object.prototype.toString.call(obj)] || 'object') : typeof obj
  }
  return _type
})()

/**
 * 获取有效字典
 * @param {String} key
 */
export function getRealDictionary(val, dictionary) {
  if (getType(val) !== 'object') return val

  const dictionaryArray = []
  for (var i = 0; i < dictionary.length; i++) {
    if (val[getTableKey(dictionary[i])] !== undefined) {
      dictionaryArray.push(dictionary[i])
    }
  }
  return dictionaryArray
}

/**
 * 获取字典key
 * @param {String} key
 */
export function getTableKey(key) {
  return `${key}`.split('=')[0]
}

/**
 * 获取字典label
 * @param {String} key
 */
export function getTableLabel(key) {
  return `${key}`.split('=')[1]
}

/**
 * 获取值对应的描述
 * @param {String} key
 * @param {String} val
 */
let tempKey = ''
let tempDictionary = null
export function getTableDesc(key, val) {
  const keyValArray = `${key}`.split('=')
  if (keyValArray.length !== 3) {
    return val
  } else {
    if (!tempKey || tempKey !== key) {
      tempKey = key
      tempDictionary = JSON.parse(`{"${keyValArray[2].replace(/,/g, '","').replace(/:/g, '":"')}"}`)
    }
    return tempDictionary[val]
  }
}

/**
 * 检查是否是图片
 * @param {String} val
 */
export function checkIsPicture(val) {
  return /\.(jpg|jpeg|png|gif)$/.test(val)
}
