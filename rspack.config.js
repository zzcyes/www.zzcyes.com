const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        minify: false, // 禁用 HTML 压缩，可能导致问题
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
    // 移除其他可能导致问题的插件
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset/resource",
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
    // 简化优化配置
    splitChunks: {
      chunks: "all",
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
  // 添加 preview 配置
  preview: {
    port: 4000, // 使用不同的端口，避免与开发服务器冲突
    host: '0.0.0.0',
    open: true,
    compress: true,
  },
  // 添加调试信息
  infrastructureLogging: {
    level: 'verbose',
  },
}; 