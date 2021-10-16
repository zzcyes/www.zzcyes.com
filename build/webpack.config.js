const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
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
                    removeComments: true, // 移除HTML中的注释
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
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
        }),
        ...getHtmlConfig(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: path.resolve(__dirname, '../src/assets/image'),
                    to: 'assets/image',
                },
                {
                    from: path.resolve(__dirname, '../src/assets/resouce'),
                    to: 'assets/resouce',
                },
            ],
        }),
        // 配置compression-webpack-plugin压缩
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
    module: {
        rules: [{
                    test: /\.css$/,
                    use: [
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
                        esModule: false
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
        extensions: ['.js', '.css', '.less']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            })
        ],
        // splitChunks: {
        //     chunks: 'all'
        // },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }

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