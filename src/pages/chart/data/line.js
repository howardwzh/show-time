import {makeRandomToArray, makeChartColors} from './utils'

const line = () => {
  const {bgColor, bdColor} = makeChartColors()
  return {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Line dataset",
        backgroundColor: bgColor,
        borderColor: bdColor,
        borderDash: [],
        fill: false,
        data: makeRandomToArray({min: 0, max: 50, num: 7}),
        steppedLine: false
      }]
    },
    // Configuration options go here
    options: {
      maintainAspectRatio: false,
      spanGaps: false,
      elements: {
				line: {
					tension: 0.3
				}
			}
    }
  }
}

export default line