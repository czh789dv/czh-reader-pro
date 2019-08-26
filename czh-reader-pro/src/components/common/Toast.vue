<template>
  <div class="toast-bg-wrapper" v-show="visible">
    <div class="toast-bg">
      <div class="toast" v-html="text"></div>
    </div>

  </div>
</template>

<script>
export default {
  name:'toast',
  props:{
    text: [String, Number],
    timeout: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visible : false
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../assets/styles/global";
.toast-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 2500;
    width: 100%;
    @include center;
    .toast-wrapper {
      width: 60%;
      line-height: px2rem(20);
      padding: px2rem(10) px2rem(20);
      box-sizing: border-box;
      background: #ccc;
      border-radius: px2rem(10);
      font-size: px2rem(14);
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  }
</style>
