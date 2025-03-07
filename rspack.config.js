const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

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

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: entryConfig,
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "./html"),
    filename: "assets/js/[name].[contenthash:8].js",
    clean: true,
  },
  plugins: [
    ...getHtmlPlugins(),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: "assets/images/[name].[hash:8][ext]",
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
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
            drop_debugger: process.env.NODE_ENV === 'production',
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
    splitChunks: {
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
  },
  preview: {
    port: 4000,
    host: '0.0.0.0',
    open: true,
    compress: true,
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  infrastructureLogging: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'verbose',
  },
}; 