<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="iconfont icon-down2"></span>
        </div>
        <div class="ebook-popup-title-text">选择字体</div>
      </div>
      <div class="ebook-popup-list-wrapper"></div>
    </div>
  </transition>
</template>

<script>
import {
  ebookMixin
} from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    hide() {
      this.fontFamilyVisible(false)
    }
  },
  components: {},
  data() {
    return {

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

  .ebook-popup-list-wrapper {}
}
</style>
