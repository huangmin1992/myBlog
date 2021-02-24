## Angular

* [Angular装饰器介绍地址](https://blog.csdn.net/wuyuxing24/article/details/90729934)
* [Angular-cli详情介绍](https://blog.csdn.net/wuyuxing24/article/details/90729744)
* angular升级

   先执行<u>ng update</u>, 会报错提示更新<u>@angular-devkit/schematics</u>
   

``` 

   npm install @angular-devkit/schematics
   ```

   然后执行, 会提示需要更新的依赖包
   

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

## angular路由的复用策略

* [资料转载地址](https://blog.csdn.net/qiuhaoqian/article/details/112028859)

* 代码实现

``` javascript
import {
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
    RouteReuseStrategy
} from '@angular/router';
import {
    Injectable
} from '@angular/core';

interface IRouteConfigData {
    reuse: boolean;
}

interface ICachedRoute {
    handle: DetachedRouteHandle;
    data: IRouteConfigData;
}
@Injectable()
export class ZwRouteReuseStrategy implements RouteReuseStrategy {
    private static routeCache = new Map < string, ICachedRoute > ();
    private static waitDelete: string; // 当前页未进行存储时需要删除
    private static currentDelete: string; // 当前页存储过时需要删除

    /** 进入路由触发，判断是否是同一路由 */
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
    ): boolean {
        const IsReturn =
            future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) == JSON.stringify(curr.params);
        return IsReturn;
    }

    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断，这里判断是否有data数据判断是否复用 */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.getRouteData(route)) {
            return true;
        }
        return false;
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // const url = this.getFullRouteUrl(route);
        const url = this.getRouteUrl(route);
        const data = this.getRouteData(route);

        if (
            ZwRouteReuseStrategy.waitDelete &&
            ZwRouteReuseStrategy.waitDelete === url
        ) {
            // 如果待删除是当前路由，且未存储过则不存储快照
            ZwRouteReuseStrategy.waitDelete = null;
            return null;
        } else {
            // 如果待删除是当前路由，且存储过则不存储快照
            if (
                ZwRouteReuseStrategy.currentDelete &&
                ZwRouteReuseStrategy.currentDelete === url
            ) {
                ZwRouteReuseStrategy.currentDelete = null;
                return null;
            } else {
                if (handle) {
                    ZwRouteReuseStrategy.routeCache.set(url, {
                        handle,
                        data
                    });
                    this.addRedirectsRecursively(route);
                }
            }
        }
    }

    /** 若 path 在缓存中有的都认为允许还原路由 */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // const url = this.getFullRouteUrl(route);
        const url = this.getRouteUrl(route);
        const handle = ZwRouteReuseStrategy.routeCache.has(url) ?
            ZwRouteReuseStrategy.routeCache.get(url).handle :
            null;
        const data = this.getRouteData(route);
        const IsReturn =
            data && ZwRouteReuseStrategy.routeCache.has(url) && handle != null;
        return IsReturn;
    }

    /** 从缓存中获取快照，若无则返回nul */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const url = this.getRouteUrl(route);
        const data = this.getRouteData(route);
        const IsReturn =
            data && ZwRouteReuseStrategy.routeCache.has(url) ?
            ZwRouteReuseStrategy.routeCache.get(url).handle :
            null;

        return IsReturn;
    }

    private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
        const config = route.routeConfig;
        if (config) {
            if (!config.loadChildren) {
                const routeFirstChild = route.firstChild;
                const routeFirstChildUrl = routeFirstChild ?
                    this.getRouteUrlPaths(routeFirstChild).join('/') :
                    '';
                const childConfigs = config.children;
                if (childConfigs) {
                    const childConfigWithRedirect = childConfigs.find(
                        c => c.path === '' && !!c.redirectTo
                    );
                    if (childConfigWithRedirect) {
                        childConfigWithRedirect.redirectTo = routeFirstChildUrl;
                    }
                }
            }
            route.children.forEach(childRoute =>
                this.addRedirectsRecursively(childRoute)
            );
        }
    }
    private getRouteUrl(route: ActivatedRouteSnapshot) {
        return (
            route['_routerState'].url.replace(/\//g, '_') +
            '_' +
            (route.routeConfig.loadChildren ||
                route.routeConfig.component
                .toString()
                .split('(')[0]
                .split(' ')[1])
        );
    }

    private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
        return this.getFullRouteUrlPaths(route)
            .filter(Boolean)
            .join('/')
            .replace('/', '_');
    }

    private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        const paths = this.getRouteUrlPaths(route);
        return route.parent ? [...this.getFullRouteUrlPaths(route.parent), ...paths] :
            paths;
    }

    private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        return route.url.map(urlSegment => urlSegment.path);
    }

    private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
        return (
            route.routeConfig &&
            (route.routeConfig.data as IRouteConfigData) &&
            route.routeConfig.data.reuse
        );
    }

    /** 用于删除路由快照*/
    public deleteRouteSnapshot(url: string): void {
        if (url[0] === '/') {
            url = url.substring(1);
        }
        url = url.replace('/', '_');
        if (ZwRouteReuseStrategy.routeCache.has(url)) {
            ZwRouteReuseStrategy.routeCache.delete(url);
            ZwRouteReuseStrategy.currentDelete = url;
        } else {
            ZwRouteReuseStrategy.waitDelete = url;
        }
    }
    public clear() {
        ZwRouteReuseStrategy.routeCache.clear();
    }
    public clearExcept(list) {
        if (!list || !ZwRouteReuseStrategy.routeCache) return;
        try {
            let waitDelete = [];
            ZwRouteReuseStrategy.routeCache.forEach((value: ICachedRoute, key) => {
                let handle: any = value.handle;
                let url = handle.route.value._routerState.snapshot.url;
                if (list.indexOf(url) < 0) {
                    waitDelete.push(key);
                }
            });
            waitDelete.forEach(item => {
                ZwRouteReuseStrategy.routeCache.delete(item);
            });
        } catch (error) {
            console.log('clearExcept error', error);
        }
    }
}
```

* 在<code>app.module.ts</code>中注入

``` javascript
@NgModule({
    declarations: [],
    imports: [

    ],
    providers: [{
        provide: RouterReuseStrategy,
        useClass: ZwRouterReuseStrategy
    }],
    exports: [],
    bootstrap: [AppComponent]
})
```

* 配置路由

``` javascript
const routes: Routes = [{
    path: '/',
    component: testComponent,
    data: {
        reuse: true // 表示路由复用
    }

}]
```
