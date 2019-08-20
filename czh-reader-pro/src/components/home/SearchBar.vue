<template><div>
  <div class="page" :class="{'hide-title': !titleVisible, 'hide-shadow':!shadowVisible}">
    <transition class="title-move">
      <div class="searchbar-title-wrapper" v-show="titleVisible">
        <div class="title-text-wrapper">
          <span class="title-text title">{{$t('home.title')}}</span>
        </div>
        <div class="title-icon-shake-wrapper">
          <span class="iconfont icon-shake"></span>
        </div>
      </div>
    </transition>
    <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}">
      <span class="iconfont icon-back"></span>
    </div>
    <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
      <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
      <div class="search-bar-input">
        <span class="iconfont icon-search"></span>
        <input type="text" class="input" :placeholder="$t('home.hint')" v-model="searchText"></div>

    </div></div>
    <hot-search-list v-show="!hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>

</template>

<script>
import HotSearchList from './HotSearchList'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  mixins: [homeMixin],
  components: {
    HotSearchList
  },
  watch: {
    offsetY(offsetY) {
      // console.log(offsetY)
      if (offsetY > 0) {
        this.hidetitle()
        this.showshadow()
      } else {
        this.showtitle()
        this.hideshadow()
      }
    }
  },
  methods: {
    hidetitle() {
      this.titleVisible = false
    },
    showtitle() {
      this.titleVisible = true
    },
    hideshadow() {
      this.shadowVisible = false
    },
    showshadow() {
      this.shadowVisible = true
    }
  },
  data() {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: true,
      hotSearchVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.page {
  width: 100%;
  position: relative;
  height: px2rem(94);
  z-index: 150;

  box-shadow: 0 px2rem(5) px2rem(5) 0 rgba(0, 0, 0, 0.15);

  &.hide-title {
    height: px2rem(52);
  }

  &.hide-shadow {
    box-shadow: none;
  }

  .searchbar-title-wrapper {
    position: absolute;
    width: 100%;
    height: px2rem(42);
    top: 0;
    left: 0;

    .title-text-wrapper {
      width: 100%;
      height: 100%;
      @include center;

      .title-text {}
    }

    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: 100%;
      @include center;

      .iconfont {}
    }
  }

  .title-icon-back-wrapper {
    position: absolute;
    left: px2rem(15);
    top: 0;
    height: px2rem(42);
    transition: height $animationTime $animationType;
    @include center;

    &.hide-title {
      height: px2rem(52);
    }

    .icon-back {}
  }

  .search-bar-input-wrapper {
    position: absolute;
    left: 0;
    top: px2rem(42);
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;
    transition: top $animationTime $animationType;
    display: flex;

    &.hide-title {
      top: 0;
    }

    .search-bar-blank {
      flex: 0 0 0;
      width: 0;
      transition: all $animationTime $animationType;

      &.hide-title {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }

    }

    .search-bar-input {
      flex: 1;
      width: 100%;
      border-radius: px2rem(20);
      background: #f4f4f4;
      border: px2rem(1) solid #eee;
      @include left;
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;

      .iconfont {
        color: #999;
      }

      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;

        &:focus {
          outline: none;
        }

        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>
