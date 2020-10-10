<template>
  <div>
    <div class="btn"></div>
  </div>
</template>
<style lang="scss">
.btn {
  cursor: pointer;
  width: 150px;
  height: 50px;
  background: red
    linear-gradient(to right, rgba(0, 255, 0, 0), rgba(0, 255, 0, 0.7));
  transition: background-color 0.5s;
  &:hover {
    background-color: rebeccapurple;
  }
}
</style>