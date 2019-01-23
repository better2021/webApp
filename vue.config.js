// vue.config.js
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  devServer: {
    open: true, // 自动打开浏览器
    port: 8081 // 端口
  }
}
