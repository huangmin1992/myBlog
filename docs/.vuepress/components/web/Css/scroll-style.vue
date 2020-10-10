<template>
  <div class="scroll-container">
    <div class="scroll-box">
      <p>
        <code>
            /*滚动条整体样式*/ <br/>
            &::-webkit-scrollbar {<br/>
                width: 10px; /*高宽分别对应横竖滚动条的尺寸*/<br/>
                height: 1px; <br/>
            }
        </code>
      </p>
      <p>
          <code>
            /*滚动条里面小方块*/ <br/>
            &::-webkit-scrollbar-thumb { <br/>
                border-radius: 10px;<br/>
                -webkit-box-shadow: inset 0 0 5px rgba(87, 47, 230, 0.2);<br/> 
                background:#a505a5; <br/>
            }
          </code>
      </p>
      <p>
          <code>
            /*滚动条里面轨道*/ <br/>
            &::-webkit-scrollbar-track { <br/>
                -webkit-box-shadow:inset 0 0 5px rgba(13, 2, 75, 0.2); <br/>
                border-radius: 10px;<br/>
                background:#f79aea; <br/>
            }
          </code>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "scrollStyle",
};
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  height: 350px;
  overflow: auto;
  .scroll-box {
    min-height: 200px;
    font-size: 20px;
  }
  /*滚动条整体样式*/
  &::-webkit-scrollbar {
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  /*滚动条里面小方块*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(87, 47, 230, 0.2);
    background: #a505a5;
  }
  /*滚动条里面轨道*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(13, 2, 75, 0.2);
    border-radius: 10px;
    background: #f79aea;
  }
}
</style>