import path from 'path';


// Library output details
var LIBRARY_NAME = 'js';
const ROOT_PATH = path.resolve('.');

// Build, source, etc paths
var PATHS = {
  entryPoint: path.resolve(ROOT_PATH, 'index.ts'),
  output: path.resolve(ROOT_PATH, '../../public'),
}

// Webpack config
export default {
  mode: "production",
  entry: PATHS.entryPoint,
  output: {
    path: PATHS.output,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: LIBRARY_NAME,
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  plugins: [
  ],
  externals: [
      {"pixi.js": "PIXI"},
  ]
}