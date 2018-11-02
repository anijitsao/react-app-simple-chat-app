// const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]

      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[path][name].[ext]',
            // outputPath: 'images/'
            publicPath: 'images/'
          }
        }
      }

    ]
  },

  plugins: [

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};