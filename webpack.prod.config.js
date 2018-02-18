const path = require('path')
const autoprefixer = require('autoprefixer')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map', // changed from cheap-module-eval-source-map
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: ''
  },
  resolve: {
    // these are the extensions it'll try to resolve when you ommit the file extensions when importing files
    extensions: ['.js', '.jsx']
  },
  module: { // module can be called "file", so these are the list of rules for the modules/files
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          // important here it'll load from bottom to top, so first postcss-loader, css-loader, then style-loader!
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 1 because we just run 1 loader to it, the postcss-loader, down there.
              modules: true, // css-modules,
              localIdentName: '[name]__[local]__[hash:base64:5]' // [local] is the component name
            }
          },
          {
            // this guy can turn sass on for example. Here it'll add auto prefixes for the css
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        /* 
          This puts images inline to decrease the number of files user has to download
          But also increases bundle size.
          Above 8000, file-loader enters and copy the image itself to the folder of path (dist) / the name especified in the name query param
        */
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    // this is the guy whom injects the js code into the index.html
    new htmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}