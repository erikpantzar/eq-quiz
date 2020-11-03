const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "App",
      template: "public/index.html",
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 9000,
    hot: true,
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundj.js",
    publicPath: "/",
  },
}
