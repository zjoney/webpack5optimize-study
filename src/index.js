let play = document.getElementById('play');
//渲染首页的时候先不加载video模块，等当我点击播放按钮的时候，才去服务器动态加载video模块
//import语法 vue react angular 的懒加载组件原理是一样的
play.addEventListener('click',()=>{
    //import语句是一个天然的代码分割点，如果遇到import就会分割了去一个单独的代码块，可以单独加载
    import(/* webpackChunkName: 'video', webpackPrefetch: true */'./video').then(result=>{
        console.log(result);
    });
});
// src_video_js.js 就是此模块的模块ID 把/ .换成 下划线
//是模块文件相对于根目录的相对路径 ./src/video.js

//假如此文件特别大500k 当你点击播放会比较慢，
//类似的场景是路由切换  main cart
//如果这个懒加载的代码我认为很可能将会被用到
//所以我会先加载页面，等浏览器空闲的时候再去加载src_video_js.js
//那用户随后点击播放的时候，
//preload 预加载 此资源肯定会用到，优先较高，需要提前获取。它要慎 用，有可能有性能隐患 
//prefetch 预获取 此资源在以后可能会用到，它是在浏览器空闲的时候加载，没有性能问题
