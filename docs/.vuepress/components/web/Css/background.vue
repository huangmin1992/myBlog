<template>
  <div>
    <div class="background-attachment">
      <div class="g-img">section1</div>
      <div class="g-img">section2</div>
      <div class="g-img">section3</div>
      <div class="g-img">section4</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
      background: url(http://pic1.win4000.com/wallpaper/2018-05-18/5afe820a3446b.jpg)
        center no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
    &:nth-child(2) {
      background: url(http://pic1.win4000.com/wallpaper/2018-07-04/5b3c7fd2d66ff.jpg)
        center no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
    &:nth-child(3) {
      background: url(http://pic1.win4000.com/wallpaper/2019-12-13/5df321951329d.jpg)
        center no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
    &:nth-child(4) {
      background: url(http://pic1.win4000.com/wallpaper/6/5847b8f8a63db.jpg)
        center no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
  }
}
</style>