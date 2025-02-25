const path = require("path")
const webpack = require('webpack')
require('babel-polyfill')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: {
    main: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
              // Adds CSS to the DOM by injecting a `<style>` tag
               loader: 'style-loader'
          },
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
          {
              loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    }),
    new HtmlWebPackPlugin({
      template: "./src/html/welcome.html",
      filename: "./welcome.html",
      excludeChunks: [ 'server' ]
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
