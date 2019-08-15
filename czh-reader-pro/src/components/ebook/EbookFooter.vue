<template>
  <div class="page">
    <span class="ebook-footer-text">{{this.progress+'%'}}</span>
  </div>
</template>

<script>
import {
  ebookMixin
} from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.page {
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(48);
  box-sizing: border-box;
  padding: 0 px2rem(15);
  @include right;

  .ebook-footer-text {
    color: #6d7178;
    font-size: px2rem(12);
    line-height: px2rem(14);
  }
}
</style>
