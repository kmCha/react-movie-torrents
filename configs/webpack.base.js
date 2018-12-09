/*
 *  基础配置，即多个文件中共享的配置
 */

const paramConfig = require('./webpack.params');

const path = require('path');

const glob = require(paramConfig.require_path + 'glob');

const fs = require('fs');
const os = require("os");

const webpack = require(paramConfig.require_path + 'webpack');
const HappyPack = require(paramConfig.require_path + "happypack");
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const HtmlWebpackPlugin = require(paramConfig.require_path + 'html-webpack-plugin');
const CleanWebpackPlugin = require(paramConfig.require_path + 'clean-webpack-plugin');

function getEntry(globPath) {
  //获取globPath路径下的所有文件
  let files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;
  //循环
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry); //返回路径的所在的文件夹名称
    extname = path.extname(entry); //返回指定文件名的扩展名称
    /**
     * path.basename(p, [ext])
     * 返回指定的文件名，返回结果可排除[ext]后缀字符串
     * path.basename('/foo/bar/baz/asdf/quux.html', '.html')=>quux
     */
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename); //路径合并
    entries[basename] = entry;
  }
  //返回map=>{fileName:fileUrl}
  return entries;
}

//获取所有的入口文件
let jsEntries = getEntry('./src/js/entry/*.js');

let config = {
  //入口
  entry: jsEntries,
  //loader配置
  module: {
    noParse: function (content) {
      return /\/js\/lib\//.test(content);
    },
    //lib文件夹内容不使用loader
    rules: [
      //使用 Babel
      {
        test: /\.js$/, // 支持 js
        exclude: [/node_modules/, /lib/],
        include: /src/,
        use: ['happypack/loader?id=babel']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
      //图片处理
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'img',
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
      //字体格式
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
      //html处理
      {
        test: /\.html$/,
        //exclude: /inline/, //不处理inline文件夹下的文件
        use: [{
          loader: 'html-loader', //资源路径补全
          options: {
            // 支持 html `${}` 语法
            removeComments: true,
            interpolate: 1,
            attrs: [':data-src', ':src']
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      // name: 'vendor',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        },
        lib: {
          test: /[\\/]js\/lib[\\/]/,
          name: 'lib'
        },
        default: false
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist/*", "release/*"], {
      "root": path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new HappyPack({
      id: "babel",
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              'env', {
                modules: false // 不要编译ES6模块
              }
            ]
          ],
          plugins: [
            [
              "transform-runtime", {
                "polyfill": false, //编译promise需要
                "regenerator": true //编译async需要
              }
            ]
          ]
        }
      }]
    })
  ]
};

//获取所有html页面
let tplPages = Object.keys(getEntry('./src/*.html'));

tplPages.forEach((pathname) => {
  let conf = {
    chunksSortMode: 'manual',
    filename: pathname + '.html', //生成的html存放路径，相对于path
    template: './src/' + pathname + '.html', //ejs模板路径,前面最好加上loader用于处理
    chunks: [pathname, 'vendor', 'runtime', 'lib']
  };

  //开发环境，将html加到入口中，实现自动刷新页面
  if (process.env.NODE_ENV === 'development') {
    config.entry["_refresh_html_" + pathname] = tplPages[pathname];
  }

  config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;