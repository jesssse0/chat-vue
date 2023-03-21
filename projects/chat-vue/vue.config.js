const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // 选项
  publicPath: process.env.NODE_ENV === 'production' ? '//x.autoimg.cn/cfw/cfw/activity/operation-activity/' : '/',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? './'
  //   : '/',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    disableHostCheck: true,
    port: 3000,
    proxy: {
      // todo 上线前修改
      '/cus': {
        target: 'http://test.yczj.api.autohome.com.cn/',
        ws: true,
        changeOrigin: true,
      },
      // // todo 上线前修改
      // '/openapi': {
      //   target: '192.168.0.105:8082/',
      //   ws: true,
      //   changeOrigin: true,
      // },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        // 全部都追加
        prependData: "@import '@assets/style/core/_base.scss';",
      },
    },
    extract: {
      ignoreOrder: true,
    },
  },
  // filenameHashing: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@apis', path.resolve(__dirname, 'src/apis'))
      .set('@assets', path.resolve(__dirname, 'src/assets'))
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@data', path.resolve(__dirname, 'src/data'))
      .set('@utils', path.resolve(__dirname, 'src/utils'));

    // config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config
      .plugin('html')
      .tap(args => {
        if(process.env.NODE_ENV === 'production') {
          args[0].minify.removeComments = false;
        }
        return args;
      })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true,  //生产环境自动删除console
      //       },
      //       warnings: false,
      //     },
      //     sourceMap: false,
      //     parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      //   })
      // );
    }
  }
};
