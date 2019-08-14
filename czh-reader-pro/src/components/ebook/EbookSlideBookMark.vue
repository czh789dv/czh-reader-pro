<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} --- 一共有{{bookmark ? bookmark.length : '0' }}个书签</div>

    <scroll class="slide-bookmark-list" :top="48" :buttom="48">
      <div class="slide-bookmark-item" v-for="(item,index) in bookmark" :key="index" @click="displayBookmark(item.cfi)">
        <div class="slide-bookmark-item-icon">
          <div class="iconfont icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../common/Scroll'
import {
  ebookMixin
} from '../../utils/mixin'
import {
  getBookmark
} from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      bookmark: null
    }
  },
  methods: {
    displayBookmark(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    }
  },
  mounted() {
    this.bookmark = getBookmark(this.fileName)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-slide-bookmark {
  width: 100%;

  .slide-bookmark-title {
    width: 100%;
    height: px2rem(48);
    font-size: px2rem(14);
    font-weight: bold;
    padding: 0 px2rem(15);
    @include center;
  }

  .slide-bookmark-list {
    box-sizing: border-box;
    padding: 0 px2rem(15);
    font-size: px2rem(14);

    .slide-bookmark-item {
      display: flex;
      padding: px2rem(15) 0;
      // flex-direction: column;
      box-sizing: border-box;

      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(29);
        @include left;

        .iconfont {
          width: px2rem(20);
          height: px2rem(20);
          font-size: px2rem(14);
          border-radius: 50%;
          background: #bbb;
          @include center;
        }
      }

      .slide-bookmark-item-text {
        @include ellipsis1(3);
        font-size: px2rem(14);
        line-height: px2rem(16);
        max-height: px2rem(45);
      }
    }
  }
}
</style>
