const data = {
  data: {
    datasets: [
      {
        label: 'My First dataset',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        data: [
          { x: -38, y: -97 },
          { x: -94, y: -92 },
          { x: -51, y: 16 },
          { x: 26, y: -73 },
          { x: -46, y: -2 },
          { x: -78, y: 2 },
          { x: -91, y: 16 }
        ]
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Chart.js Scatter Chart'
    }
  }
}

export default data
