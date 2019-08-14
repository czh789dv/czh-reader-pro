<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-boormark-text-wrapper">
      <div class="ebook-bookmark-dowm-wrapper" ref="icondown">
        <span class="iconfont icon-down"></span></div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style='isFixed ? fixedStyle : {}'>
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
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      }
    }
  },
  methods: {
    addBookmark() {},
    removeBookmark() {},
    //状态4: 归为
    restore() {
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`
        this.$refs.icondown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    //状态1 初始化
    beforeHeight() {
      //国际化字体 并给予书签颜色
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    //状态2:到达临界值之前
    beforeThreshold(v) {
      this.$refs.bookmark.style.top = `${-v}px`
      this.beforeHeight()
      //重置箭头
      const icondown = this.$refs.icondown
      if (icondown.style.transform === 'rotate(180deg)') {
        icondown.style.transform = 'rotate(0deg)'
      }
    },
    //状态3: 到达临界值
    afterThreshold(v) {
      this.$refs.bookmark.style.top = `${-v}px`
      //国际化文字
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      const icondown = this.$refs.icondown
      //更改箭头朝向
      if (icondown.style.transform === '' || icondown.style.transform === 'rotate(0deg)') {
        icondown.style.transform = 'rotate(180deg)'
      }
    }
  },
  watch: {
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        //未加载完成 目录存在 菜单存在 不监听  减少资源浪费
        return
      }
      if (v >= this.height && v <= this.threshold) {
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHeight(v)
      } else if (v === 0) {
        this.restore()
      }
    }
  },
  components: {
    Bookmark
  },
  data() {
    return {
      text: '',
      color: WHITE,
      isFixed: false
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
