<template>
  <div class="page">
    <span class="ebook-header-text">{{getSectionName}}</span>
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
.page{
  position: absolute;
  height: px2rem(48);
  width: 100%;
  top:0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 px2rem(15);
  @include left;
  .ebook-header-text{
    line-height: px2rem(14);
    font-size: px2rem(12);
    color: #6d7178;
    @include ellipsis1(2);
  }
}
</style>
