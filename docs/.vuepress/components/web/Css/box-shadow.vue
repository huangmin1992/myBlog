<template>
  <div class="box-shadow">
    <div class="box">box-shadow曲线阴影</div>
    <div class="box1">
      <div class="img">box-shadow翘边阴影</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box-shadow {
  .box {
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
  .box1 {
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
}
</style>