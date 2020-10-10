<template>
  <div class="line-box">
    <div class="lines">
      限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号
      限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号限制内容行数省略号
      限制内容行数省略号 限制内容行数省略号
      限制内容行数省略号限制内容行数省略号限制内容行数省略号
    </div>
    <h5>文字纹理叠加效果</h5>
    <div class="text-wl">
      <div class="mix">
        <span data-text="css纹理叠加"></span>
        css纹理叠加
      </div>
    </div>
    <h5>文字渐变</h5>
    <div class="font-color">文字渐变</div>
    <h5>流光字体</h5>
    <div class="font-animate"><h2>这是一个可以变色的文字</h2></div>
  </div>
</template>
<style lang="scss" scoped>
.line-box {
  border: 1px solid #ccc;
  padding: 10px;
}
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
.text-wl {
  .mix {
    font-size: 80px;
    font-family: "微软雅黑";
    background-image: url("../../../public/1.jpg");
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
  .mix > span {
    position: absolute;
    background-image: linear-gradient(to right, #f00, #f00);
    mix-blend-mode: overlay;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
  .mix > span::before {
    content: attr(data-text);
  }
}
.font-color {
  display: inline-block;
  color: #f00;
  font-size: 3em;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    from(green),
    to(yellow)
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.font-animate {
  font-size: 5em;
  background-image: -webkit-linear-gradient(
    left,
    #f00,
    #54e 25%,
    #f00 50%,
    #54e 75%,
    #f00
  );
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
</style>