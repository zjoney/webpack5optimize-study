const path = require('path');
const plugin1 = path.resolve(__dirname, 'plugins', 'plugin1.js');
const plugin2 = path.resolve(__dirname, 'plugins', 'plugin2.js');
const plugin3 = path.resolve(__dirname, 'plugins', 'plugin3.js');
const plugin4 = path.resolve(__dirname, 'plugins', 'plugin4.js');
const plugin5 = path.resolve(__dirname, 'plugins', 'plugin5.js');
const plugin6 = path.resolve(__dirname, 'plugins', 'plugin6.js');
function preset1() { 
  return  { plugins: [plugin5,plugin6] } 
}
function preset2() { 
  return  { plugins: [plugin3,plugin4] } 
}
//plugins: [plugin1,plugin2],
//presets: [preset1,preset2]
//插件先执行预设后执行
//插件是从前往后
//预设是从后往前
//plugin1,plugin2 plugin3,plugin4 plugin5,plugin6
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [plugin1,plugin2],
            presets: [preset1,preset2]
          },
        },
      },
    ]
  },
  plugins: []
};