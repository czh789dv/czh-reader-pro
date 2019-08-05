<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview" :style="{background: item.style.body.background}" :class="{'selected': item.name === defaultTheme}"></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  ebookMixin
} from '../../utils/mixin'
import {
  saveTheme
} from '../../utils/localStorage'
export default {
  methods: {
    setTheme(index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.initGlobalStyle()
      })
      //保存到本地缓存
      saveTheme(this.fileName, theme.name)
    }
  },
  mixins: [ebookMixin],
  //计算属性 不会频繁调用  混入mixin
  // computed: {
  //   themeList() {
  //     return themeList(this)
  //   }
  // },
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.setting-wrapper {
  z-index: 101;
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0px px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);

  .setting-theme {
    height: 100%;
    display: flex;

    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;

      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;

        &.selected {
          //向下4 长度6
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
        }

      }

      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;

        &.selected {
          color: #333;
          font-size: px2rem(16);

        }
      }
    }
  }
}
</style>
