## Angular

* [Angular装饰器介绍地址](https://blog.csdn.net/wuyuxing24/article/details/90729934)
* [Angular-cli详情介绍](https://blog.csdn.net/wuyuxing24/article/details/90729744)
* angular升级
   先执行<u>ng update</u>,会报错提示更新<u>@angular-devkit/schematics</u>
   ```
   npm install @angular-devkit/schematics
   ```
   然后执行,会提示需要更新的依赖包
   ```
   npm update
   ```
   最后执行
   ```
    ng update @angular/cli @angular/core ng-zorro-antd  rxjs
   ```

## angular正确导入date-fns

``` javascript
import {
    differenceInCalendarDays,
    setHours
} from 'date-fns';
```

## ng-color-picker 插件

* [demo地址](https://zefoy.github.io/ngx-color-picker/); 
* [github地址](https://github.com/zefoy/ngx-color-picker/tree/4.x.x/); 

## Angular-electron

* [angular-electron的github地址](https://github.com/maximegris/angular-electron)
* [electron写入注册表实现开机启动](https://www.bbsmax.com/A/kjdwq0jEJN/)

## onlyoffice 

* [onlyOffice在线编辑官网](https://api.onlyoffice.com/editors/command)

## SheetJS

[官网地址](https://sheetjs.com/)

## angular中引入echarts

1. 安装命令

``` 
npm install echarts --save
npm install ngx-echarts --save
```

2. 在angular.json中引入js文件

``` 
"scripts":[
    "node_modules/echarts/dist/echarts.js"
]
```

3. 使用步骤

   + 首先在需要的module中引入，例如：<u>home.module.ts</u>
   

``` 
   import {NgxEchartsModule} from 'ngx-echarts';
   

   import:[
       CommonModule,
       HomeMRoutingModule,
       ...
       NgxEchartsModule
   ]
   ```

   + 在组件中定义options数据
   

``` javascript
   option = {
       backgroundColor: '#ccc',
       tooltip: {},
       xAxis: {},
       ...
   }
```

   + 在组件html组件中使用
   

``` html
   <div echarts [options]='option'></div>
```

备注：如果出现如下错误，则表示当前echarts版本与ngx-echarts版本不兼容; 

``` 
No provider for InjectionToken NGX_ECHARTS_CONFIG!
```

重新安装

``` 
npm install echarts@4.4.0  ngx-echarts@4.2.1 --save
```
