const projectName = "xos12";
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: `./src/${projectName}/js/index.js`,
  output: {
    filename: `js/${projectName}.built.js`,
    path: resolve(__dirname, "build"),
    clean: true,
    globalObject: "this",
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
          //   兼容性
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [require("postcss-preset-env")()],
              },
            },
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          //预设: 指示 babel 做怎样的兼容性处理
          presets: [
            //presets 这里是俩 中括号!!!!!!!!!!!!!!!!!!!!!!!!!!!
            [
              "@babel/preset-env",
              {
                // 按需加载
                useBuiltIns: "usage",
                // 指定 core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/${projectName}/index.html`,
    }),

    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: `css/1${projectName}.built.css`,
    }),

    new CssMinimizerPlugin(),

    new ESLintPlugin({ fix: true }),
  ],

  devServer: {
    static: "./dist",
  },

  //生产环境下会自动压缩js代码
  mode: "production",
  // mode: "development",
};
