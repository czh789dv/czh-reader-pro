<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0 }">
        <div class="icon-wrapper">
          <span class="icon-menu iconfont" @click="ShowSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress iconfont" @click="ShowSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright iconfont" @click="ShowSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A iconfont" @click="ShowSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
  </div>
</template>

<script>
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import {
  ebookMixin
} from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    ShowSetting(key) {
      this.setSettingVisible(key)
    }
  },
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(60);
  background: white;
  display: flex;
  box-shadow: 0 px2rem(-5) px2rem(5) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);

  &.hide-box-shadow {
    box-shadow: none
  }

  .icon-wrapper {
    flex: 1;
    @include center;

    .icon-progress {
      font-size: px2rem(24);
    }

    .icon-bright {
      font-size: px2rem(24);
    }
  }

}
</style>
