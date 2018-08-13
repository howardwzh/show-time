const data = {
  type: 'radar',
  data: {
    labels: [
      ['Eating', 'Dinner'],
      ['Drinking', 'Water'],
      'Sleeping',
      ['Designing', 'Graphics'],
      'Coding',
      'Cycling',
      'Running'
    ],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        data: [52, 7, 94, 19, 84, 5, 37]
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    legend: { position: 'top' },
    title: { display: true, text: 'Chart.js Radar Chart' },
    scale: { ticks: { beginAtZero: true } }
  }
}

export default data
