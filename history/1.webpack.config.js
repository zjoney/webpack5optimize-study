
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const icon = path.join(__dirname,'icon.jpg');
const  SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const bootstrap = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loadersPath = path.resolve(__dirname,'loaders');
const webpack =require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//因为CSS和JS的加载可以并行，所以我们可以通过此插件提取CSS成单独的文件,然后去掉无用的 css并进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
//glob.sync(`${PATHS.src}/**/*`,{nodir:true})
const glob = require('glob');//文件匹配模式
const PATHS = {
    src:path.resolve(__dirname,'src')
}
//默认值是undefined node环境 的环境变量
//可以读取.env文件，获取里面的值 ，设置到process.env.NODE_ENV里面
//require('dotenv').config();
/* let fs = require('fs');
let env =JSON.parse(fs.readFileSync(path.resolve(__dirname,'.env'),'utf8'));
for(let key in env)
  process.env[key]=env[key];

console.log('webpack.config.js process.env.NODE_ENV',process.env.NODE_ENV); */
//默认的mode(production)<config.js mode<命令里的mode
//webpack5中的tree shaking是经过了加强的优化的，功能比webpack4强大的多
module.exports = {
    mode:'production',//配置的模式 一会讲
    devtool:'hidden-source-map',//调试工具的选择 一会讲
    context:process.cwd(),//上下文目录 根目录
    entry:'./src/index.js',
   /*  optimization:{
     minimize:false,//开始最小化
     minimizer:[
         new TerserPlugin()//压缩JS
     ]
    } */
    output:{
        path:path.resolve(__dirname,'dist'),//输出的路径
        filename:'[name].js'//输出的文件名
    },
    /* resolve:{// 对普通loader
      extensions:['.js','.jsx','.json'],//指定文件的扩展名,找不到会报错
      alias:{bootstrap},//指定查找别名
      modules:["c:/node_modules",'node_modules'],// 指定查找目录
      mainFields:['browser', 'module', 'main'],//从package.json中的哪个字段查找入口文件
      mainFiles:['index']//如果找不到mainFields的话，会找索引文件，index.js
    },
    resolveLoader:{//只对loader有用
      modules:[loadersPath,'node_modules']
    },
    externals:{
      jquery:'jQuery'
    }, */
    //oneOf只可能匹配数组中的某一个，找到一个之后就不再继续查找剩下的loader
    module:{
        //如果模块的路径匹配此正则的话，就不需要去查找里面的依赖项 require import
        rules:[
              {
                  oneOf:[
                      {
                          test:/\.js$/,
                          include:path.resolve(__dirname,'src'),
                          exclude:/node_modules/,//不解析node_modules
                          use:[
                              //thread-loader开启线程池，开线程和线程通信都需要时间
                              {
                              loader:'thread-loader',options:{workers:3}}
                              ,{
                                  loader:'babel-loader',
                                  options:{
                                      cacheDirectory:true //启动babel缓存
                                  }
                              }]
                      },
                      {
                          test:/\.css$/,
                          use:[
                              'style-loader',
                              'css-loader'
                          ]
                      },
                      {
                          test:/\.less$/,
                          use:[
                            'style-loader',
                              'css-loader',
                              'less-loader'
                          ]
                      },
                      {
                          test:/\.(jpg|png|gif|bmp)$/,
                          use:[
                             {
                                 loader:'image-webpack-loader',
                                 options: {
                                  mozjpeg: {
                                    progressive: true,
                                  },
                                  optipng: {
                                    enabled: false,
                                  },
                                  pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                  },
                                  gifsicle: {
                                    interlaced: false,
                                  },
                                  webp: {
                                    quality: 75
                                  }
                                }
                             }
                          ]
                      }
                  ]
              }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            /* minify:{ //压缩HTML
                collapseWhitespace:true,
                removeComments:true
            } */
        })
    ]
  }
//提取css
//干掉无用的css