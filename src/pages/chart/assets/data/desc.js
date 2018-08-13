const desc = {
  // data
  'chartData.data.labels': {
    Type: 'Array',
    Desc: '每个轴的类别'
  },
  'chartData.data.datasets.label': {
    Type: 'String',
    Desc: '数据集名称'
  },
  'chartData.data.datasets.fill': {
    Type: 'Boolean',
    Desc: '是否填充背景色'
  },
  'chartData.data.datasets.backgroundColor': {
    Type: 'Color',
    Desc: '填充背景色'
  },
  'chartData.data.datasets.borderColor': {
    Type: 'Color',
    Desc: '线 | 边框颜色'
  },
  'chartData.data.datasets.data': {
    Type: 'Array',
    Desc: '数据集'
  },
  // options
  'chartData.options.responsive': {
    Type: 'Boolean',
    Desc: '是否可以调整图表画布的容器大小（好像没效果）'
  },
  'chartData.options.maintainAspectRatio': {
    Type: 'Boolean',
    Desc: '保持纵横比'
  },
  'chartData.options.title.display': {
    Type: 'Boolean',
    Desc: '是否显示图表名称'
  },
  'chartData.options.title.text': {
    Type: 'String',
    Desc: '图表名称'
  },
  'chartData.options.tooltips.mode': {
    Type: 'String',
    Desc: '提示模式',
    Example: 'point | nearest | index | dataset | x | y'
  },
  'chartData.options.tooltips.intersect': {
    Type: 'Boolean',
    Desc: '如果为true，则仅在鼠标位置与元素相交时才显示提示'
  }
}


export default desc