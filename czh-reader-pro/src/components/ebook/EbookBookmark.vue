<template>
  <div class="ebook-bookmark">
    <div class="ebook-boormark-text-wrapper">
      <div class="ebook-bookmark-dowm-wrapper">
        <span class="iconfont icon-down"></span>
        <div class="ebook-bookmark-text">{{text}}</div>
      </div>
      <div class="ebook-bookmark-icon-wrapper">
        <bookmark :color="'red'"></bookmark>
      </div>
    </div>
  </div>
</template>

<script>
import Bookmark from '../common/BookMark'
export default {
  components: {
    Bookmark
  },
  data() {
    return {
      text: this.$t('book.pulldownAddMark')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);

  .ebook-boormark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;

    .ebook-bookmark-dowm-wrapper {
      font-size: px2rem(16);
      color: white;
      transition: all .2s linear;
      @include center;
    }
  }

  .ebook-bookmark-icon-wrapper {}
}
</style>
