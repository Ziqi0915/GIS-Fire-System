const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: ''//用来进行本地访问，线上服务器需要另外设置。

})
