const webpack = require('webpack');
const fs = require('fs')

module.exports = {
  lintOnSave: false,
  devServer: {
    // This should fix the host issue
    disableHostCheck: true
    // host: '0.0.0.0',
    // port: 443,
    // https: {
    //   key: fs.readFileSync('./example_com.key'),
    //   cert: fs.readFileSync('./pelodashboard_com.crt')
    // }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Black Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
