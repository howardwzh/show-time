import _map from 'lodash/map'
import _cloneDeep from 'lodash/cloneDeep'
import NP from 'number-precision'

/**
 * 获得最大商数
 * @param {Object} limit 
 * @param {Number} value 
 */
function getMaxResult (limit, value) {
    return getResultAndRemainder(NP.minus(limit.max, limit.offset), value).result
}

/**
 * 获得商和余数
 * @param {Number} dividend 
 * @param {Number} divisor 
 */
export function getResultAndRemainder (dividend, divisor) {
    const tempDividend = dividend < divisor ? divisor : dividend
    const result = Math.floor(NP.divide(tempDividend, divisor))
    const remainder = NP.minus(tempDividend, NP.times(divisor, result)) || dividend - divisor
    return {
        result,
        remainder
    }
}

/**
 * 求出所以可能组合
 * @param {Array} groupLimit 
 * @param {Array} groupValue 
 */
export function getEveryPossible (groupLimit, groupValue) {
    let everyResult = {init: []}
    _map(groupLimit, (valL, keyL) => {
        _map(groupValue, (valV, keyV) => {
            everyResult = insertItemIfHaveNot(everyResult, `${keyL}÷${keyV}`, getMaxResult(valL, valV))
        })
    })
    return deleteRedundantItem(everyResult, 3)
}

/**
 * 插入可选方向值
 * @param {Object} obj 
 * @param {String} newKey 
 * @param {Number} newVal 
 */
function insertItemIfHaveNot (obj, newKey, newVal) {
    const pannert = new RegExp(newKey.replace('÷', '|'))
    const newObj = _cloneDeep(obj)
    _map(obj, (val, key) => {
        if (!pannert.test(key)) {
            newObj[`${key},${newKey}`] = val.concat(newVal)
        }
    })
    return newObj
}

/**
 * 删除边数不足的组合
 * @param {Object} obj 
 * @param {Number} number 
 */
function deleteRedundantItem (obj, number) {
    const resultObj = {}
    _map(obj, (val, key) => {
        const matchArray = key.match(/,/g)
        if (matchArray && matchArray.length === number) {
            resultObj[key.replace('init,', '')] = {
                plan: val,
                number: NP.times(val[0], val[1], val[2])
            }
        }
    })
    return resultObj
}

/**
 * 求出剩余箱子的木托方案
 * @param {Number} remainder 
 * @param {Object} wood 
 * @param {Object} box 
 * @param {Object} val 
 * @param {String} key 
 * @param {Boolean} isXFirst 
 * @param {Number} remainderLimitZMax 
 */
export function getPlanToPutRemainder(remainder, wood, box, val, key, itemFirst = '1', remainderLimitZMax) {
    let {valX, valZ} = {}
    const valY = val.plan[1]
    const valXZ = Math.ceil(NP.divide(remainder, valY))
    const planArray = key.split(',')
    const newWood = _cloneDeep(wood)
    newWood.limitZ.max = Number(remainderLimitZMax || newWood.limitZ.max)

    if (itemFirst === '1') {
        valX = Math.min(getMaxResult(newWood.limitX, box[planArray[0].split('÷')[1]]), valXZ)
        valZ = Math.ceil(NP.divide(valXZ, valX))
    } else {
        valZ = Math.min(getMaxResult(newWood.limitZ, box[planArray[2].split('÷')[1]]), valXZ)
        valX = Math.ceil(NP.divide(valXZ, valZ))
    }
    
    return {
        [key]: {
            plan: [valX, valY, valZ ],
            number: NP.times(valX, valY, valZ)
        }
    }
}

/**
 * 计算木托尺寸
 * @param {Number} boxParams 
 * @param {Number} boxNumber 
 * @param {Number} offset 
 */
export function countWoodResult (boxParams, boxNumber, offset) {
    return NP.round(NP.plus(NP.times(boxParams, boxNumber), offset), 3)
}
