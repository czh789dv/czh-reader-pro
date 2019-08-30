<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="iconfont icon-down2"></span>
        </div>
        <div class="ebook-popup-title-text">{{$t('book.selectFont')}}</div>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, key) in fontFamilyList" :key="key" @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check">
            <span class="icon-check iconfont" v-if="isSelected(item)"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  // setLocalStorage,
  // getLocalStorage,
  // removeLocalStorage,
  // clearLocalStorage,
  saveFontFamily
} from '../../utils/localStorage'
import {
  FONT_FAMILY
} from '../../utils/book'
import {
  ebookMixin
} from '../../utils/mixin'
export default {
  // mounted() {
  //   setLocalStorage(this.flieName, this.defaultFontFamily)
  //   console.log(getLocalStorage(this.flieName))
  //   setLocalStorage('a', '1')
  //   setLocalStorage('b', '2')
  //   removeLocalStorage('a')
  //   clearLocalStorage()
  // },
  mixins: [ebookMixin],
  methods: {
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
        // console.log('????' + font)
      }
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font
    },
    hide() {
      this.fontFamilyVisible(false)
    }
  },
  components: {},
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  background: white;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.15);

  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) soild #b8b99b;
    text-align: center;
    @include center;

    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
      font-size: px2rem(16);
      font-weight: bold;

      .icon-down2 {}
    }

    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }

  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(15);

      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;

        &.selected {
          color: #fb2263;
          font-weight: bold;
        }
      }

      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);

        &.selected {
          color: #fb2263;
          font-weight: bold;
        }

        .icon-check {}
      }
    }

  }
}
</style>
