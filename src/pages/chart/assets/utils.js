import _random from 'lodash/random'
import * as allChartData from './data'

const getChartDataByType = (type, index) => {
  const chartData = allChartData[type]
  const randomeData = _getChartDataHelper(type, index)
  const pointForBubble = type === 'bubble' ? _makePointForBubble() : null
  chartData.data.datasets[0] = { ...chartData.data.datasets[0], ...randomeData }
  if (pointForBubble) {
    chartData.options.elements.point = {
      ...chartData.options.elements.point,
      ...pointForBubble
    }
  }
  return chartData
}

const _getChartDataHelper = (type, index) => {
  let randomeData = {}
  const { backgroundColor, borderColor } = _makeBgBdColors() // eslint-disable-line

  switch (true) {
    case /^(pie|doughnut|polarArea)$/.test(type):
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor: _makeRandomColorsToArray({}),
        data: _makeRandomToArray({ num: 5 })
      }
      break
    case /^(scatter)$/.test(type):
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor,
        borderColor,
        data: _makeRandomForScatter({})
      }
      break

    case /^(bubble)$/.test(type):
      randomeData = {
        data: _makeRandomForBubble({})
      }
      break

    default:
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor,
        borderColor,
        data: _makeRandomToArray({})
      }
      break
  }
  return randomeData
}

const _makeRandomToArray = ({ min = -50, max = 50, num = 7 }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(_random(min, max))
  }
  return arr
}

const _makeBgBdColors = (function () {
  const allBgBdColors = {}
  return (index) => {
    if (!index || !allBgBdColors[index]) {
      const rgb = `${_random(0, 255)}, ${_random(0, 255)}, ${_random(0, 255)}`
      allBgBdColors[index] = {
        backgroundColor: `rgba(${rgb}, 0.7)`,
        borderColor: `rgba(${rgb}, 0.9)`
      }
    }
    return allBgBdColors[index]
  }
})()

const _makeRandomColorsToArray = ({ num = 5 }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(`rgba(${_random(0, 255)}, ${_random(0, 255)}, ${_random(0, 255)}, 0.6)`)
  }
  return arr
}

const _makeRandomForBubble = ({ minX = -50, maxX = 50, minY = -50, maxY = 50, minV = 200, maxV = 600, num = 5 }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push({
      x: _random(minX, maxX),
      y: _random(minY, maxY),
      v: _random(minV, maxV)
    })
  }
  return arr
}

const _makePointForBubble = () => {
  return {
    backgroundColor: (context) => {
      return _makeBgBdColors(`${context.datasetIndex}_${context.dataIndex}`).backgroundColor
    },

    borderColor: (context) => {
      return _makeBgBdColors(`${context.datasetIndex}_${context.dataIndex}`).borderColor
    },

    borderWidth: function(context) {
      return Math.min(Math.max(1, context.datasetIndex + 1), 8)
    },

    hoverBackgroundColor: 'transparent',

    hoverBorderColor: function() {
      return _makeRandomColorsToArray({ num: 1 })[0]
    },

    hoverBorderWidth: function(context) {
      var value = context.dataset.data[context.dataIndex]
      return Math.round((8 * value.v) / 1000)
    },

    radius: function(context) {
      var value = context.dataset.data[context.dataIndex]
      var size = context.chart.width
      var base = Math.abs(value.v) / 1000
      return (size / 24) * base
    }
  }
}

const _makeRandomForScatter = ({ minX = -50, maxX = 50, minY = -50, maxY = 50, num = 7 }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push({
      x: _random(minX, maxX),
      y: _random(minY, maxY)
    })
  }
  return arr
}

const stringifyPro = obj => {
  const placeholder = '____PLACEHOLDER____'
  const fns = []
  let json = JSON.stringify(
    obj,
    function(key, value) {
      if (typeof value === 'function') {
        fns.push(value)
        return placeholder
      }
      return value
    },
    2
  )
  json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function() {
    return fns.shift()
  })
  return json
}

const firstUpperCase = (str) => {
  return str.replace(/^(\w{1})/, ($1) => {
    return $1.toUpperCase()
  })
}

export { getChartDataByType, stringifyPro, firstUpperCase }
