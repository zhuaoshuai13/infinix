const projectName = "hot";
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

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
        test: /common.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 100, // 适合750的设计稿 1rem = 75px
              remPrecision: 5, // px转rem小数点保留的位置
            },
          },
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
        test: /pc.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 100, // 适合750的设计稿 1rem = 75px
              remPrecision: 5, // px转rem小数点保留的位置
            },
          },
          // 将 Sass 编译成 CSS
          // "sass-loader",
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
        test: /mb.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 200, // 适合750的设计稿 1rem = 75px
              remPrecision: 5, // px转rem小数点保留的位置
            },
          },
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

    new StylelintPlugin({
      fix: true,
      files: ["src/hot/css/*.scss"],
      exclude: ["build/css/*.css"],
    }),

    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: `css/${projectName}.built.css`,
    }),

    // new CssMinimizerPlugin(),

    new ESLintPlugin({ fix: true }),
  ],

  devServer: {
    static: "./dist",
  },

  //生产环境下会自动压缩js代码
  mode: "production",
  // mode: "development",
};
