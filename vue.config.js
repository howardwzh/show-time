module.exports = {
  configureWebpack: {
    output: {
      publicPath: process.env.NODE_ENV === 'production' ? 'http://www.howardwzh.com/show-time/' : './'
    }
  }
}