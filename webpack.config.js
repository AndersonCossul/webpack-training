const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map', // best source map for development. Rich and fast.
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}