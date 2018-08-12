const data = {
  type: 'bubble',
  data: {
    datasets: [
      {
        data: [
          {
            x: -0.7298096707819184,
            y: 14.870541838134443,
            v: 54.95970507544581
          },
          {
            x: -52.115483539094654,
            y: 76.71789266117969,
            v: 23.799725651577504
          },
          {
            x: -6.857638888888886,
            y: 19.930984224965727,
            v: 323.6582647462277
          },
          {
            x: -10.78960905349794,
            y: -51.323516803840874,
            v: 371.20198902606313
          },
          {
            x: 40.25527263374485,
            y: -32.878943758573385,
            v: 583.0975651577503
          },
          {
            x: 0.44367283950614933,
            y: -70.56862997256515,
            v: 376.0116598079561
          },
          {
            x: -26.057741769547334,
            y: -60.22590877914952,
            v: 166.61093964334705
          },
          {
            x: 64.91769547325103,
            y: -147.6841135116598,
            v: 371.56207133058984
          },
          {
            x: -122.4633487654321,
            y: 21.223422496570635,
            v: 407.53172153635114
          },
          { x: 15.965792181069958, y: 50.66336591220852, v: 691.1865569272977 },
          { x: 84.37178497942386, y: 44.80238340192042, v: 639.193244170096 },
          {
            x: -63.078703703703695,
            y: -142.19285836762688,
            v: 668.2184499314129
          },
          { x: -72.2190072016461, y: 93.8443072702332, v: 194.92884087791495 },
          {
            x: -88.88245884773663,
            y: -142.91945301783264,
            v: 635.9910836762689
          },
          { x: -8.90239197530866, y: 1.6825274348422568, v: 408.0718449931413 },
          { x: 21.88786008230454, y: -118.18308470507544, v: 927.8377914951989 }
        ]
      }
    ]
  },
  options: {
    aspectRatio: 1,
    legend: false,
    tooltips: false,

    elements: {
      point: {
        backgroundColor: 'colorize.bind(null, false)',

        borderColor: 'colorize.bind(null, true)',

        borderWidth: function(context) {
          return Math.min(Math.max(1, context.datasetIndex + 1), 8);
        },

        hoverBackgroundColor: 'transparent',

        hoverBorderColor: function() {
          return 'utils.color(context.datasetIndex)';
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
  }
}

export default data
