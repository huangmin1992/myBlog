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

## 路由守卫CanActivate

#### 路由守卫：在进入或离开某路由时，用于判断是否可以离开、进入某路由；<code>return true</code>代表可以进入当前路由；<code>return false</code>代表不可以进入当前路由，但可以进入自定义路由.

#### 路由守卫与路由的关系：路由守卫只能用于路由项上；路由守卫可以应用于过个路由项；每个路由项可以有多个路由守卫；

路由守卫通过如下接口实现：

* <code>canActivate</code>：控制是否允许进入路由。（通过 return false/true判定）
* <code>canActivateChild</code>：等同canActivate，只不过针对的是所有子路由。
* <code>canDeactivate</code>：控制是否允许离开路由。
* <code>canLoad</code>：控制是否允许颜值加载整个模块。

#### 当需要某些条件/某个身份才能进入的路由，就可以使用路由守卫属性了。

#### 路由守卫的使用

* 首先新建一个<code>service</code>, name:<code>GuardService</code>

``` 

ng g service common/guard
```

* 路由守卫代码

``` javascript
import {
    Injectable
} from '@angular/core';
import {
    CanActivate,
    Router
} from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {
    constructor(private router: Router, private _http: HttpClient) {}
    getIsAdmin() {
        return new Promise((resolve) => {
            this._http.get('/user/isAdmin').subscribe((resp: boolean) => {
                resolve(resp);
            });
        });
    }
    // 进入路由守卫
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
        return this.getIsAdmin().then((isAdmin) => {
            if (isAdmin) { // 如果是管理员, 可以进入当前路由；
                return true;
            } else {

                // 如果不是管理员，不能进入当前路由，进入手动导航的ordinary路由；
                this.router.navigateByUrl('/ordinary');
                return false;
            }
        });
    }
}
```

* 注册路由文件, <code>app.module.ts</code>

``` javascript
@NgModule({
    declarations: [AppComponent],
    providers: [
        GuardService // 注入路由守卫服务
    ],
    bootstrap: [AppComponent]
})
```

* 给对应的路由项配置路由守卫，eg：<code>app.routing.ts</code>

``` javascript
// 当导航到Home时，需要进入路由守卫的canActivate类进行判断是否可以进入此路由

// 什么时候需要在路由项上加路由守卫？？当需要某些条件/某个身份才能进入的路由，这时需要在路由项上加入路由守卫属性

export const routes: Routes = [{
    path: '',
    component: AppComponent,
    children: [{
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            component: HomeComponent,
            canActivate: [GuardService] // 给对应的路由添加守卫
        }
    ]
}, ];
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [RouterModule]
})
export class RoutingModule {}
```

## 监听页面长时间未操作，自动退出登录界面

``` typescript
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ElectronService} from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class WatcherOperationService {
  lastTime: number;
  currentTime: number;
  timeOut = 30 * 60 * 1000; // 设置超时时间： 30分

  constructor(
    private router: Router,
    private electronS: ElectronService
  ) {
  }

  initWatcher() {
    this.lastTime = new Date().getTime();
    this.currentTime = new Date().getTime();

    window.onload = () => {
      window.addEventListener('mousedown', () => this._setLastTime());
      window.addEventListener('mousewheel', () => this._setLastTime());
      window.addEventListener('keydown', () => this._setLastTime());
    };

    /* 定时器 间隔30秒检测是否长时间未操作页面 */
    window.setInterval(() => this._checkTimeout(), 30000);
  }

  private _setLastTime() {
    // 鼠标按下记录最后一次操作时间
    localStorage.setItem('lastTime', new Date().getTime() + '');
  }

  private _checkTimeout() {
    this.currentTime = new Date().getTime(); // 更新当前时间
    this.lastTime = +localStorage.getItem('lastTime');
    if (this.currentTime - this.lastTime > this.timeOut
      && localStorage.getItem('u_ak')
      && localStorage.getItem('u_sk')
    ) { // 判断是否超时
      localStorage.removeItem('u_ak');
      localStorage.removeItem('u_sk');
      localStorage.removeItem('lastTime');
      if (this.electronS.isElectron()) {
        this.electronS.openLoginWindow();
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}

```
