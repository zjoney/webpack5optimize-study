
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',//配置的模式 一会讲
    devtool:'inline-source-map',//调试工具的选择 一会讲
    context:process.cwd(),//上下文目录 根目录
    //mpa 多页应用
   entry:{
      entry1:'./src/entry1.js',
      entry2:'./src/entry2.js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',//默认只分割异步模块
        minSize:0,
        maxSize:0,
        cacheGroups:{
          default:false,///禁 用默认缓存组
          commons:{
            minChunks:2,
            reuseExistingChunk:false
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