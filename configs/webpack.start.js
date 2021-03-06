/*
 *  本地开发环境使用的配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const paramConfig = require('./webpack.params');

//loader
const config = merge.smart(baseConfig, {
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, '../output'),
        filename: '[name]_[hash:8].js',
        chunkFilename: '[name]_[chunkhash:8].js',
        publicPath: paramConfig.cdn_path_dev,
        jsonpFunction: 'leihuoJsonp'
    },

    module: {
        rules: [
            //构建 CSS
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: ['style-loader', 'css-loader']

            },

            //CSS 预处理器
            {
                test: /\.less$/,
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'layout-header-background': '#f0f2f5'
                            }
                        }
                    }
                ]
            }
        ]
    },

    //设置本地开发环境
    devServer: {
        contentBase: path.join(__dirname, "../"),
        port: 9000, //设置端口
        host: '0.0.0.0',
        open: false,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        hot: true //是否开启热更，调试html时候关闭，调试css与js开启
    }

})

//plugins
config.plugins.push(
    new webpack.DefinePlugin({
        __DEBUG: JSON.stringify(true),
        __CDNPATH: JSON.stringify(paramConfig.cdn_path_dev)
    }),
    //热更新的两个插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
)

module.exports = config
