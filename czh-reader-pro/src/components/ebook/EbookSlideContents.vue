<template>
  <div class="ebook-slide-content">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="iconfont icon-search"></span>
        </div>
        <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')" @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage">{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :buttom="48" ref="scroll">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label" :style="contentItemStyle(item)" :class="{'selected': section === index }" @click="dispalyNavigation(item.href)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
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
  px2rem
} from '../../utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      searchVisible: false

    }
  },
  methods: {
    dispalyNavigation(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-slide-content {
  width: 100%;
  font-size: 0;

  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;

    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;

      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;

        .iconfont {}
      }

      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;

        &:focus {
          outline: none;
        }
      }
    }

    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;

    }
  }

  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(5) px2rem(20) px2rem(5);
    box-sizing: border-box;

    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      padding: 0 px2rem(10);

      .slide-contents-book-img {
        width: px2rem(50);
        height: px2rem(66);
      }
    }

    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(5);
      box-sizing: border-box;

      .slide-contents-book-title {
        width: px2rem(120);
        font-size: px2rem(12);
        line-height: px2rem(16);
        @include ellipsis1(3);
      }

      .slide-contents-book-author {
        width: px2rem(120);
        font-size: px2rem(10);
        margin-top: px2rem(8);
        @include ellipse;
      }
    }

    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .slide-contents-book-progress {
        .progress {
          font-size: px2rem(14);
        }

        .progress-text {
          font-size: px2rem(12);
        }
      }

      .slide-contents-book-time {
        font-size: px2rem(12);
        margin-top: px2rem(8);
      }
    }
  }

  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;

    .slide-contents-item {
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      font-size: px2rem(14);

      // @include ellipse;
      .slide-contents-item-label {
        flex: 1;
        line-height: px2rem(16);
      }

      .slide-contents-item-page {}
    }
  }
}
</style>
