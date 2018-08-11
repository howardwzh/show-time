import {makeRandomToArray, makeChartColors} from './utils'

const bar = () => {
  const {bgColor, bdColor} = makeChartColors()
  return {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Bar dataset",
        backgroundColor: bgColor,
        borderColor: bdColor,
        data: makeRandomToArray({min: 0, max: 50, num: 7}),
        borderWidth: 1
      }]
    },
    // Configuration options go here
    options: {
      responsive: true,
      legend: {
        position: 'top'
      }
    }
  }
}

export default bar