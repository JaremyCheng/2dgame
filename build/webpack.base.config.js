const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const resolvePath = function(url) {
  return path.resolve(__dirname, '../src', url)
}
// console.log(resolvePath('index.js'))
// console.log(path.resolve(__dirname, '../dist'))
module.exports = {
  entry: resolvePath('index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': '../src'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '2D-GAME',
      template: resolvePath('index.template.html')
    })
  ],
  devServer: {
    contentBase: resolvePath("dist"),
    port: 9000
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};