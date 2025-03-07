const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { rspack } = require('@rspack/core');

// 获取入口和HTML配置
const getEntryAndHtmlConfig = () => {
  const modulesPath = path.resolve(__dirname, "./src/page");
  const entryConfig = {};
  const htmlConfig = [];

  fs.readdirSync(modulesPath).forEach((dirName) => {
    if (/^\w/.test(dirName)) {
      const entryPath = path.resolve(modulesPath, dirName, "./index.js");
      if (!fs.existsSync(entryPath)) {
        fs.writeFileSync(entryPath, "");
      }
      entryConfig[dirName] = entryPath;
      htmlConfig.push({
        template: path.resolve(modulesPath, dirName, "./index.html"),
        chunks: [dirName],
        filename: `${dirName}.html`,
        minify: process.env.NODE_ENV === 'production' ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
        } : false,
      });
    }
  });

  return [entryConfig, htmlConfig];
};

const [entryConfig, htmlConfig] = getEntryAndHtmlConfig();

const getHtmlPlugins = () => {
  return htmlConfig.map((html) => {
    return new HtmlWebpackPlugin(html);
  });
};

console.debug("entryConfig", entryConfig);

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  mode: isDev ? "development" : "production",
  entry: entryConfig,
  output: {
    // 开发环境使用 '/'，生产环境使用 './'
    publicPath: isDev ? "/" : "./",
    path: path.resolve(__dirname, "./html"),
    filename: isDev ? "assets/js/[name].js" : "assets/js/[name].[contenthash:8].js",
    clean: true,
  },
  plugins: [
    ...getHtmlPlugins(),
    // 开发环境启用 HMR 插件
    isDev && new rspack.HotModuleReplacementPlugin(),
    // 只在生产环境使用 CopyRspackPlugin
    !isDev ? new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/image"),
          to: "assets/image",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "src/assets/resouce"),
          to: "assets/resouce",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "blog.conf"),
          to: "",
          noErrorOnMissing: true,
        },
      ],
    }) : false,
    // 只在生产环境使用 CompressionWebpackPlugin
    !isDev ? new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|eot|ttf|woff|ico|png|jpg|gif|json|txt|map)$/,
      threshold: 1024,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }) : false,
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  "cssnano",
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/image/[name].[hash:8][ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".css"],
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: !isDev,
            drop_debugger: !isDev,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              minifyFontValues: true,
              minifyGradients: true,
            },
          ],
        },
      }),
    ],
    // 开发环境简化 splitChunks 配置
    splitChunks: isDev ? {
      chunks: 'all',
    } : {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: 'vendors',
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./html"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    devMiddleware: {
      writeToDisk: false,
    },
    watchFiles: ['src/**/*'],
  },
  performance: {
    hints: !isDev ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  infrastructureLogging: {
    level: !isDev ? 'warn' : 'info',
  },
  // 开发环境启用 source map
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  // 设置目标环境
  target: isDev ? 'web' : ['web', 'browserslist'],
}; 