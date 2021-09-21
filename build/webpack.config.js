const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const MiniCssExtractPlugin=require('mini-css-extract-plugin')
// const existModules = ['rain','luck','kobe','home','resume'];

const getEntryAndHtmlConfig = () => {
    const modulesPath = path.resolve(__dirname, '../src/page');
    const entryConfig = {};
    const htmlConfig = [];

    fs.readdirSync(modulesPath).forEach(dirName => {
        if (/^\w/.test(dirName)) {
            entryConfig[dirName] = path.resolve(modulesPath, dirName, './index.js');
            htmlConfig.push({
                template: path.resolve(modulesPath, dirName, './index.html'),
                chunks: [dirName],
                filename: `${dirName}.html`,
                minify: {
                    removeComments:true, // 移除HTML中的注释
                    collapseWhitespace: true, // 删除空格、换行
                    minifyCSS: true, // 压缩文内css
                    minifyJS: true, // 压缩文内js
                },
            });
        }
    });

    return [entryConfig, htmlConfig];
};

const [entryConfig, htmlConfig] = getEntryAndHtmlConfig();

const getHtmlConfig = () => {
    return htmlConfig.map(html => {
        return new HtmlWebpackPlugin(html);
    });
};

module.exports = {
    mode: 'development',
    entry: entryConfig,
    output: {
        publicPath: './',
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].[contenthash:8].js'
    },
    plugins:[
        
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
        }),
        ...getHtmlConfig(),
        new CopyWebpackPlugin( {
            patterns: [
                { 
                    from: path.resolve(__dirname, '../src/assets/image'),
                    to: 'assets/image',
                },
                { 
                    from: path.resolve(__dirname, '../src/assets/resouce'),
                    to: 'assets/resouce',
                },
            ],
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css"
        // }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true,
          }),
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    // process.env.NODE_ENV === 'development' ? 'style-loader': MiniCssExtractPlugin.loader,
                   'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'assets/image',
                    esModule: false,
                }
            },
            { 
                test: /\.(mp3|pdf)$/, 
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/resouce',
                    esModule: false
                }
            },
            { 
                test: /\.(eot|svg|ttf|woff)$/, 
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/font',
                    esModule: false
                }
            }
           
          ]
        //   [
        //     {
        //       from: path.resolve(__dirname, '../src/assets'),
        //       to: 'static',
        //       ignore: ['.*']
        //     }
        //   ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['.js',  '.css', '.less']
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
          }),
        //   new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //       preset: ['default', { discardComments: { removeAll: true } }],
        //     },
        //     canPrint: true,
        //   }),
        ],
        // splitChunks:{
        //     chunks:'all'
        // }
      },

    //   optimization: {
    //     minimizer: [
    //       new OptimizeCSSAssetsPlugin({
    //         assetNameRegExp: /\.optimize\.css$/g,
    //         cssProcessor: require('cssnano'),
    //         cssProcessorPluginOptions: {
    //           preset: ['default', { discardComments: { removeAll: true } }],
    //         },
    //         canPrint: true,
    //       })
    //     ]
    //   },
  
}