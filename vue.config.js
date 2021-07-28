const path = require('path')
const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 下面这段是自己加的，根据自己文件的位置来修改
        path.resolve(__dirname, 'src/style/common.less')
      ]
    }
  },
  configureWebpack: {
    mode: process.env.NODE_ENV,
    externals: {
      AMap: 'window.AMap'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  },
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
  },
  devServer: {
    // 设置代理
    proxy: {
      '/uomc': {
        target: 'http://192.168.3.136:8070/uomc', // docker 容器内部 Apollo 访问地址和端口
        changeOrigin: true,
        pathRewrite: {
          '^/uomc': '/'
        }
      }
    }
  }
}
