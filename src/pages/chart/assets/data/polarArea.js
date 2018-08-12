const data = {
  data: {
    datasets: [
      {
        data: [94, 55, 39, 7, 22],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        label: 'My dataset'
      }
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
  },
  options: {
    responsive: true,
    legend: { position: 'right' },
    title: { display: true, text: 'Chart.js Polar Area Chart' },
    scale: { ticks: { beginAtZero: true }, reverse: false },
    animation: { animateRotate: false, animateScale: true }
  }
}

export default data
