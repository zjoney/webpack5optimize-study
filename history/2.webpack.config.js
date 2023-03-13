
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',//配置的模式 一会讲
    devtool:'inline-source-map',//调试工具的选择 一会讲
    context:process.cwd(),//上下文目录 根目录
    //mpa 多页应用
   entry:{
      page1:'./src/page1.js',
      page2:'./src/page2.js',
      page3:'./src/page3.js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',//默认只分割异步模块
        minSize: 0,//分割出去的代码块的最小体积，0表示不限制
        maxSize: 0,//分割出去的代码块的最大体积，0表示不限制
        minRemainingSize: 0,//分割后剩下体积 0表示不限制 webpack5新添的参数
        //minChunks: 1,//如果此模块被多个入口引用几次会被分割
        maxAsyncRequests: 30,//异步请求最大分割出去几个代码块
        maxInitialRequests: 30,//同步时最大分割出去几个代码块
        automaticNameDelimiter: '~',//名称的分隔符
        enforceSizeThreshold: 50000,//强制阈值 新增加的参数
        cacheGroups: {//缓存组配置 配置如何对模块分组相同分组会分到一个代码块中
          defaultVendors: {//第三方模块
            test: /[\\/]node_modules[\\/]/,//如果模块的路径匹配此正则的话
            priority: -10,//很多缓存组，如果一个模块同属于多个缓存组，应该分到哪个组里，看优先级高
            reuseExistingChunk: true//是否可复用现有的代码块 单独写个例子
          },
          default: {
            minChunks: 2,//此模块最几个入口引用过,最少2个才取提取
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    output:{
        path:path.resolve(__dirname,'dist'),//输出的路径
        filename:'[name].js'//输出的文件名
    },
    devServer:{
      port:8080
    },
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
            filename:'page1.html',
            chunks:['page1']//往HTML页面里播放哪些资源文件(bundle)
        }),
        new HtmlWebpackPlugin({
          template:'./src/index.html',
          filename:'page2.html',
          chunks:['page2']
      }),
      new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'page3.html',
        chunks:['page3']
    })
    ]
  }