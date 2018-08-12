const data = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [-5, 46, 97, 11, 65, -71, -24],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: { display: true, text: 'Chart.js Line Chart' },
    tooltips: { mode: 'index', intersect: false },
    hover: { mode: 'nearest', intersect: true },
    scales: {
      xAxes: [
        { display: true, scaleLabel: { display: true, labelString: 'Month' } }
      ],
      yAxes: [
        { display: true, scaleLabel: { display: true, labelString: 'Value' } }
      ]
    }
  }
}

export default data
