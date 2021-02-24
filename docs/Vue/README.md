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
