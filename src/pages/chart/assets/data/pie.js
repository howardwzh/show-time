const data = {
  type: 'pie',
  data: {
    datasets: [
      {
        data: [70, 49, 98, 50, 15],
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
  options: { responsive: true }
}

export default data
