<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-boormark-text-wrapper">
      <div class="ebook-bookmark-dowm-wrapper">
        <span class="iconfont icon-down"></span></div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
import {
  ebookMixin
} from '../../utils/mixin'
import {
  realPx
} from '../../utils/utils'
import Bookmark from '../common/BookMark'
const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
  mixins: [ebookMixin],
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    }
  },
  watch: {
    offsetY(v) {
      if (v >= this.height && v <= this.threshold) {
        this.$refs.bookmark.style.top = `${-v}px`
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
      } else if (v >= this.threshold) {
        this.$refs.bookmark.style.top = `${-v}px`
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
      }
    }
  },
  components: {
    Bookmark
  },
  data() {
    return {
      text: '',
      color: WHITE
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

    .ebook-bookmark-text {
      font-size: px2rem(16);
      color: white;
    }
  }

  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>
