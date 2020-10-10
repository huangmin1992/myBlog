## 滚动条Style

<web-Css-scroll-style/>

## 取消a标签默认背景色

``` css
a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
}
```

## 文本Txt

#### 文本行数限制

``` css
    .lines {
        display: -webkit-box;
        display: -moz-box;
        /*white-space: pre-wrap; */
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
```

#### 文本纹理叠加

``` css
<div class="text-wl"><div class="mix"><span data-text="css纹理叠加"></span>css纹理叠加 </div></div>.text-wl {
    .mix {
        font-size: 80px;
        font-family: "微软雅黑";
        background-image: url("58db48fa0edb9.jpg");
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }

    .mix>span {
        position: absolute;
        background-image: linear-gradient(to right, #f00, #f00);
        mix-blend-mode: overlay;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }

    .mix>span::before {
        content: attr(data-text);
    }
}
```

#### 文字渐变

``` css
<div class="font-color">文字渐变</div>
/*css 样式*/

.font-color {
    display: inline-block;
    color: #f00;
    font-size: 3em;
    background-image: -webkit-gradient(linear, 0 0, 100% 100%, from(green), to(yellow));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}
```

#### 流光字体

``` css
<div class="font-animate"><h2>这是一个可以变色的文字</h2></div>
/*css 样式*/

.font-animate {
    font-size: 5em;
    background-image: -webkit-linear-gradient(left, #f00, #54e 25%, #f00 50%, #54e 75%, #f00);
    -webkit-text-fill-color: transparent;
    background-size: 200% 100%;
    animation: fontAnimate 4s infinite linear;
    -webkit-background-clip: text;
}

@keyframes fontAnimate {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}
```

#### demo

********

<web-Css-text-line-control/>

## button按钮

* hover样式change

``` css
<div class="btn"></div>

/*css 样式*/
.btn {
    width: 150px;
    height: 50px;
    background: red linear-gradient(to right, rgba(0, 255, 0, 0), rgba(0, 255, 0, 0.7));
    transition: background-color 0.5s;

    &:hover {
        background-color: rebeccapurple;
    }
}
```

<web-Css-button/>

## boxShadow 

* 曲线阴影

``` css
<div class="box">box-shadow曲线阴影 </div>.box {
    position: relative;
    width: 700px;
    height: 200px;
    margin: 0 auto;
    background: #fff;
    text-align: center;
    line-height: 200px;
    font-size: 25px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.3) inset;

    &::after,
    &::before {
        display: block;
        position: absolute;
        content: "";
        background: rgba(0, 0, 0, 1);
        bottom: 0;
        left: 15px;
        right: 15px;
        top: 50%;
        z-index: -1;
        box-shadow: 0 0px 20px rgba(0, 0, 0, 0.4);
        border-radius: 30%;
    }
}
```

* 翘边阴影

``` css
<div class="box1"><div class="img">box-shadow翘边阴影</div></div>.box1 {
    width: 400px;
    height: 300px;
    background: #f1f1f1;
    margin: 0 auto;
    margin-top: 15px;
    line-height: 300px;
    font-size: 25px;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 0, 0, 0.4) inset;
    border-radius: 12px;
    position: relative;

    &::after,
    &::before {
        position: absolute;
        content: "";
        display: block;
        width: 80%;
        height: 80%;
        left: 43px;
        bottom: 11px;
        background: #f1f1f1;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
        z-index: -1;
    }

    &::after {
        transform: skew(12deg) rotate(4deg);
    }

    &::before {
        transform: skew(-12deg) rotate(-4deg);
    }
}
```

<web-Css-box-shadow/>

## 自定义虚线

``` css
<div class="line"></div>.line::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #e0e0e0, #e0e0e0 10px, transparent 10px, transparent);
    background-size: 21px 100%;
}
```

<web-Css-border/>

## Background

* background-attachment

``` html
  <div class="background-attachment">
      <div class="g-img">section1</div>
      <div class="g-img">section2</div>
      <div class="g-img">section3</div>
      <div class="g-img">section4</div>
  </div>
```

``` css
  .background-attachment {
      width: 100%;
      height: 500px;
      overflow: auto;

      .g-img {
          width: 100%;
          height: 100vh;
          text-align: center;
          line-height: 100vh;
          font-size: 50px;
          font-size: 700;

          &:nth-child(1) {
              background: url(http://pic1.win4000.com/wallpaper/2018-05-18/5afe820a3446b.jpg) center no-repeat;
              background-size: cover;
              background-attachment: fixed;
          }

          &:nth-child(2) {
              background: url(http://pic1.win4000.com/wallpaper/2018-07-04/5b3c7fd2d66ff.jpg) center no-repeat;
              background-size: cover;
              background-attachment: fixed;
          }

          &:nth-child(3) {
              background: url(http://pic1.win4000.com/wallpaper/2019-12-13/5df321951329d.jpg) center no-repeat;
              background-size: cover;
              background-attachment: fixed;
          }

          &:nth-child(4) {
              background: url(http://pic1.win4000.com/wallpaper/6/5847b8f8a63db.jpg) center no-repeat;
              background-size: cover;
              background-attachment: fixed;
          }
      }
  }
```

<web-Css-background/>

## nav导航栏

* 光标下划线跟随鼠标移动

``` html
<ul>
    <li>导航栏1</li>
    <li>导航栏2</li>
    <li>导航栏3</li>
    <li>导航栏4</li>
    <li>导航栏5</li>
</ul>
```

``` css
.nav-box {
    ul {
        display: flex;

        li {
            position: relative;
            padding: 20px;
            transition: 0.2s all linear;
            cursor: pointer;
            list-style: none;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 100%;
                width: 0;
                height: 100%;
                border-bottom: 2px solid #000;
                transition: 0.2s all linear;
            }

            &:hover::before {
                width: 100%;
                left: 0;
                top: 0;
                transition-delay: 0.1s;
                border-bottom-color: #000;
                z-index: -1;
            }

            &:hover~&::before {
                left: 0;
            }

            &:active {
                background-color: #000;
                color: #fff;
            }
        }
    }
}
```
<web-Css-nav/>