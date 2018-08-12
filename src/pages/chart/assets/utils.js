import _random from 'lodash/random'
import * as allChartData from './data'

const getChartDataByType = (type, index) => {
  const chartData = allChartData[type]
  const randomeData = _getChartDataHelper(type, index)
  const pointForBubble = type ==='bubble' ? _makePointForBubble() : null
  chartData.data.datasets[0] = { ...chartData.data.datasets[0], ...randomeData }
  if (pointForBubble) {
    chartData.options.elements.point = { ...chartData.options.elements.point, ...pointForBubble }
  }
  return chartData
}

const _getChartDataHelper = (type, index) => {
  let randomeData = {}
  const { backgroundColor, borderColor } = _makeRandomColorsForChart() // eslint-disable-line

  switch (type) {
    case 'pie':
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor: _makeRandomColorsToArray({ num: 5 }),
        data: _makeRandomToArray({ min: -50, max: 50, num: 5 })
      }
      break
    case 'doughnut':
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor: _makeRandomColorsToArray({ num: 5 }),
        data: _makeRandomToArray({ min: -50, max: 50, num: 5 })
      }
      break

    case 'bubble':
      randomeData = {
        data: _makeRandomForBubble({ num: 5 })
      }
      break

    default:
      randomeData = {
        label: `${type} ${index}`,
        backgroundColor,
        borderColor,
        data: _makeRandomToArray({ min: -50, max: 50, num: 7 })
      }
      break
  }
  return randomeData
}

const _makeRandomToArray = ({ min, max, num }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(_random(min, max))
  }
  return arr
}

const _makeRandomColorsForChart = () => {
  const rgb = `${_random(0, 255)}, ${_random(0, 255)}, ${_random(0, 255)}`
  return {
    backgroundColor: `rgba(${rgb}, 0.7)`,
    borderColor: `rgba(${rgb}, 0.9)`
  }
}

const _makeRandomColorsToArray = ({ num }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(`rgb(${_random(0, 255)}, ${_random(0, 255)}, ${_random(0, 255)})`)
  }
  return arr
}

const _makeRandomForBubble = ({ num }) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push({
      x: _random(-50, 50),
      y: _random(-50, 50),
      v: _random(200, 600)
    })
  }
  return arr
}

const _makePointForBubble = () => {
    return {
        backgroundColor: function() {
          return _makeRandomColorsToArray({num: 1})[0];
        },

        borderColor: function() {
          return _makeRandomColorsToArray({num: 1})[0];
        },

        borderWidth: function(context) {
          return Math.min(Math.max(1, context.datasetIndex + 1), 8);
        },

        hoverBackgroundColor: 'transparent',

        hoverBorderColor: function() {
          return _makeRandomColorsToArray({num: 1})[0];
        },

        hoverBorderWidth: function(context) {
          var value = context.dataset.data[context.dataIndex];
          return Math.round(8 * value.v / 1000);
        },

        radius: function(context) {
          var value = context.dataset.data[context.dataIndex];
          var size = context.chart.width;
          var base = Math.abs(value.v) / 1000;
          return (size / 24) * base;
        }
      }
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

export { getChartDataByType, stringifyPro }
