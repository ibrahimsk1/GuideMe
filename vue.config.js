const path = require('path')

const webpack = require('webpack'); 
var dotenv = require('dotenv');

module.exports = {

  publicPath: '/GuideMe/',

  configureWebpack: {
    plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }) 
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
    )
  },
  lintOnSave: false,
}
