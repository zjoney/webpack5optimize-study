## Webpack5性能优化与原理

1.webpack优化配置和实战
 
2.webpack原理 tree-shaking 
 

### 1.配置与实战
- 如何配置和启动项目
- 如何进行数据性能分析
- 编译时间的优化
- 编译体积的优化
- 如何运行的更快


  "style": "dist/css/bootstrap.css",
  "sass": "scss/bootstrap.scss",
  "main": "dist/js/bootstrap.js",


## 2.如何配置环境信息

  vue脚手架都读取.env文件
为什么要写JSON.stringfy？


window SET KEY=VALUE
mac   export KEY=VALUE


## 代码分割的规则
1. 每个入口是一个chunk
   page1
   page2
   page3
2.动态import会分割代码块
   asyncModule1
3.代码分割splitChunkPlugin

vendors-node_modules__lodash_4_17_20_lodash_lodash_js.js lodash
vendors-node_modules__jquery_3_5_1_jquery_dist_jquery_js.js jquery
page1.js page1.js module1.js module2.js
page2.js page2.js module1.js module2.js
page3.js page3.js module1.js module3.js
asyncModule1.js asyncModule1.js