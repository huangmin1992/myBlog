## 全局注册组件/插件

 ### Vue.component()

* Vue.component() 才是用来全局注册组件的
* [转载地址](https://www.jianshu.com/p/afa9304d2694)

``` javascript
main.js
import testC from 'testC.vue';

Vue.component('testC', testC); // 全局注册可用；
```

### Vue.use()

* Vue.use() 是用来注册插件的

``` javascript
// 注册插件
loading.vue

import loadingComponent from './loadingComponent.vue';

const loading = {
    install: function(Vue) {
        Vue.component('loading', loadingComponent);
    }
}
export default loading;

main.js

import loading from '@/loading'

Vue.use(loading); // 插件引用
```

## 兼容ie

``` 

npm install babel-polyfill es6-promise -S
```

* 然后在<code>main.js</code>中引入<code>es6-promise</code>, ps: 在最顶上引入

``` 

import 'babel-polyfill';
import promise from 'es6-promise';
promise.polyfill();
```

* 在<code>webpack.base.conf.js</code>, <code>entry</code>入口文件添加babel-polyfill; 

``` 

entry:{
    app:['babel-polyfill','src/main.js']
}
```

* es6转es5, 在<code>.babelrc</code>文件中添加；

``` 

npm install babel-preset-es2015
```

``` 

{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "es2015",
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}

```

## Vue动态配置接口地址

* 首先在静态文件夹<code>static</code>下，新建json文件：<code>BASE_CONFIG. JSON</code>文件；如下：

``` json
// BASE_CONFIG.json
{
  "proxyTableKey": "/api", // 代理target
  "pathRewrite": "/api", // 预设地址
  "projectPath": "/api", // 工程路径
  "baseUrl": "http://49.73.235.43:8086" // 接口地址
}
```

* 在axios接口封装js文件中，引入BASE_CONFIG. JSON文件

``` javascript
let Config;
(function() {
    const request = new XMLHttpRequest();
    request.open('GET', 'static/config/BASE_CONFIG.json', false);
    request.send(null);
    if (request.status === 200) {
        Config = JSON.parse(request.responseText);
        localStorage.setItem('BASE_CONFIG', JSON.stringify(Config));
        if (process.env.NODE_ENV === 'development') {
            //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
            axios.defaults.baseURL = Config.proxyTableKey;
        } else if (process.env.NODE_ENV === 'production') {
            //生产环境下的地址
            axios.defaults.baseURL = Config.baseUrl + Config.projectPath;
        }
    }
})();
```

* 在<code>config/index.js</code>中，动态配置代理地址

``` javascript
const path = require('path');
const CONFIGS = require("../static/config/BASE_CONFIG.json");

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            [CONFIGS.proxyTableKey]: {
                target: CONFIGS.baseUrl, // 打包
                timeout: 5 * 60 * 1000,
                changeOrigin: true,
                pathRewrite: {
                    [`^${CONFIGS.proxyTableKey}`]: CONFIGS.pathRewrite
                }
            }
        },

        // Various Dev Server settings 192.168.1.107  localhost
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
```

## vuex 

* <code>webpack</code>前端项目自动化<code>require.context</code>

``` javascript
  import Vue from 'vue'
  import Vuex from 'vuex'
  import getters from './getters'

  Vue.use(Vuex)

  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const modulesFiles = require.context('./modules', true, /\.js$/)

  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
      // set './app.js' => 'app'
      const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = modulesFiles(modulePath)
      modules[moduleName] = value.default
      return modules
  }, {})

  const store = new Vuex.Store({
      modules,
      getters
  })

  export default store
```

## Vue自定义插件

* 在<code>src/plugin</code>文件夹下新建插件js<code>message.js</code>

``` javascript
export default {
    install(app, options) {
        const showMessage = (res) => {
            console.log('设置自定义插件方法' + res);
        }
        const content = {
            count: 1,
            str: '自定义插件属性',
            type: 'string'
        }
        console.log(app)
        // 添加全局混入
        app.mixin({
            mounted() {
                console.log('这里是设置全局混入，这会在每个组件的mounted生命周期里面');
            }
        })
        // 添加全局指令
        app.directive('bg', {
            mounted: function(el, binding) {
                console.log(el);
                console.log(binding)
                el.style.background = binding.value.background;
            }
        })
        // 把新建的方法和属性绑定到全局
        app.showMessage = app.config.globalProperties.$showMessage = showMessage;
        app.content = app.config.globalProperties.$content = content;
    }
}
```

* 在<code>main.js</code>中引入插件

``` javascript
  import {
      createApp
  } from 'vue'
  import App from './App.vue'
  import './index.css'
  import axios from 'axios';
  import _ from 'loadsh';
  import message from './plugins/message';
  const app = createApp(App);
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$loadsh = _;
  app.use(message);
  app.mount('#app')
```

* 在<code>.vue</code>文件中使用

``` 
<template>
  <div id="app">
    <div v-bg="{ color: '#fff', background: 'pink' }">5444646546</div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      test: "background",
      bg: "pink",
    };
  },
  mounted() {
    console.log(this.$content);
  },
};
</script>

```
