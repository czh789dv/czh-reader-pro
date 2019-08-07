<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-warpper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="iconfont icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-warpper" @click="prevSection">
            <span class="icon-back iconfont"></span>
          </div>
          <!-- 进度条  -->
          <input type="range" class="progress" max="100" min="0" step="1" @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)" :value="progress" :disabled="!bookAvailable" ref="progress">
          <div class="progress-icon-warpper" @click="nextSection">
            <span class="icon-forward iconfont"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <!-- 文本显示  可用的时候进度条 不可用显示加载 -->
          <span>({{bookAvailable ? progress + '%' : '加载中.....'}})
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  ebookMixin
} from '../../utils/mixin'

export default {
  // computed: {
  //   getSectionName() {
  //     if (this.section) {
  //       const sectionInfo = this.currentBook.section(this.section)
  //       if (sectionInfo && sectionInfo.href) {
  //         console.log((sectionInfo.href).label)
  //         return this.currentBook.navigation.get(sectionInfo.href)
  //       }
  //     }
  //     return null
  //   }
  // },
  mixins: [ebookMixin],
  methods: {
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgreeBg()
      })
    },
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgreeBg()
      })
    },
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      // this.currentBook.rendition.display(cfi).then(() => {
      //   this.refreshLocation()// })
      this.display(cfi)
    },
    updateProgreeBg() {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    prevSection() {
      //判断章节大于0  电子书存在
      if (this.section > 0 && this.bookAvailable) {
        //vuex中的方法 章节-1
        this.setSection(this.section - 1).then(() => {
          this.dispalySection()
        })
      }
    },
    nextSection() {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.dispalySection()
        })
      }
    },
    dispalySection() { //设置书的章节
      const sectionInfo = this.currentBook.section(this.section)
      //如果存在
      if (sectionInfo && sectionInfo.href) {
        //渲染
        // this.currentBook.rendition.display(sectionInfo.href)
        // this.refreshLocation()
        this.display(sectionInfo.href)
      }
    }
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

  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;

    .read-time-warpper {
      @include center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      font-size: px2rem(16)
    }

    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .progress-icon-warpper {
        font-size: px2rem(20);

      }

      .progress {
        width: 100%;
        // 去除默认样式
        -webkit-appearance: none;
        height: px2rem(2);
        // 背景颜色2种 左侧深灰 右侧浅灰
        // background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;

        // //绑定方法 根据进度改变颜色比利
        // background-size: 0 100% !important;
        //上下0  左右10
        margin: 0 px2rem(10);

        &:focus {
          outline: none;
        }

        //进度条中间能动的那个小手柄
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #dddddd;

        }
      }
    }

    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(16);
      // text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;

      .progress-section-text {
        @include ellipse;
      }

    }
  }
}
</style>
