import _map from 'lodash/map'
import _cloneDeep from 'lodash/cloneDeep'
import NP from 'number-precision'

export function getMaxResult (limit, value) {
    return getResultAndRemainder(NP.minus(limit.max, limit.offset), value).result
}

export function getResultAndRemainder (dividend, divisor) {
    const result = Math.floor(NP.divide(dividend, divisor))
    const remainder = NP.minus(dividend, NP.times(divisor, result))
    return {
        result,
        remainder
    }
}

export function getEveryPossible (groupLimit, groupValue) {
    let everyResult = {init: []}
    _map(groupLimit, (valL, keyL) => {
        _map(groupValue, (valV, keyV) => {
            everyResult = insertItemIfHaveNot(everyResult, `${keyL}÷${keyV}`, getMaxResult(valL, valV))
        })
    })
    return deleteRedundantItem(everyResult, 3)
}

export function insertItemIfHaveNot (obj, newKey, newVal) {
    const pannert = new RegExp(newKey.replace('÷', '|'))
    const newObj = _cloneDeep(obj)
    _map(obj, (val, key) => {
        if (!pannert.test(key)) {
            newObj[`${key},${newKey}`] = val.concat(newVal)
        }
    })
    return newObj
}

export function deleteRedundantItem (obj, number) {
    const resultObj = {}
    _map(obj, (val, key) => {
        const matchArray = key.match(/,/g)
        if (matchArray && matchArray.length === number) {
            resultObj[key] = {
                plan: val,
                number: NP.times(val[0], val[1], val[2])
            }
        }
    })
    return resultObj
}
