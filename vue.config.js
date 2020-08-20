const isHopeApp = process.env.VUE_APP_OWNER === 'hope'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  css: { // 配置css模块
    loaderOptions: { // 向预处理器 Loader 传递配置选项
      less: { // 配置less（其他样式解析用法一致）
        javascriptEnabled: true // 设置为true
      }
    },
    extract: !isHopeApp
  },
  productionSourceMap: false,
  pages: {
    app: !isHopeApp ? {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Show Time',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    } : {
      entry: 'src/main-hope.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Hope',
    }
  },
  configureWebpack: {
    optimization: {
      ...(isHopeApp ? { splitChunks: false } : {}) // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
    }
  }
}