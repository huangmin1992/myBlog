<template>
  <div>
    <div class="line">自定义虚线</div>
  </div>
</template>
<style lang="scss" scoped>
.line {
  position: relative;
  padding: 10px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      #f00,
      #f00 10px,
      transparent 10px,
      transparent
    );
    background-size: 21px 100%;
  }
}
</style>