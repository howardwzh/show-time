const data = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [64, 78, 80, 83, 12],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        label: 'Dataset 1'
      }
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
  },
  options: {
    responsive: true,
    legend: { position: 'top' },
    title: { display: true, text: 'Chart.js Doughnut Chart' },
    animation: { animateScale: true, animateRotate: true }
  }
}

export default data
