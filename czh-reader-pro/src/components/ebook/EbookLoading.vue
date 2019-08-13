<template>
  <!-- <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item">
        <div class="ebook-loading-line-wrapper" v-for="(item,index) in data" :key="index">
          <div class="ebook-loading-line" v-for="(subitem,subindex) in item" :key="subindex"></div>
          <div class="ebook-loading-mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>-->
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
import {
  px2rem
} from '../../utils/utils'
import {
  MASK_WIDTH,
  LINE_WIDTH
} from '../../utils/book'
export default {
  components: {},
  data() {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}]
      ],
      maskWidth: MASK_WIDTH,
      lineWidth: LINE_WIDTH,
      add: true,
      end: false
    }
  },
  mounted() {
    //定时器
    this.task = setInterval(() => {
      //遍历mask
      this.$refs.mask.forEach((item, index) => {
        //获取数据
        const mask = this.$refs.mask[index]
        const line = this.$refs.line[index]
        let maskWidth = this.maskWidth[index]
        let lineWidth = this.lineWidth[index]
        //判断是否第一条
        if (index === 0) {
          //如果是第一条 add为ture(判断是否增加或者减少) 并且最大宽度低于32(设置最大边界)
          if (this.add && maskWidth.value < 32) {
            //增加蒙版 减少实线
            maskWidth.value++
            lineWidth.value--
          } else if (!this.add && lineWidth.value < 32) {
            maskWidth.value--
            lineWidth.value++
          }
        } else {
          //不是第一条
          if (this.add && maskWidth.value < 32) {
            let preMaskWidth = this.maskWidth[index - 1]
            //
            if (preMaskWidth.value >= 16) {
              maskWidth.value++
              lineWidth.value--
            }
          } else if (!this.add && lineWidth.value < 32) {
            let preLineWidth = this.lineWidth[index - 1]
            if (preLineWidth.value >= 16) {
              maskWidth.value--
              lineWidth.value++
            }
          }
        }
        //style动态设置width和flex(向右距离)
        mask.style.width = `${px2rem(maskWidth.value)}rem`
        mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
        line.style.width = `${px2rem(lineWidth.value)}rem`
        line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
        //判断是否
        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 32) {
              this.end = true
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true
            }
          }
        }
        if (this.end) {
          this.add = !this.add
          this.end = false
        }
      })
    }, 20)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-loading {
  position: relative;
  z-index: 400;
  width: px2rem(126);
  height: px2rem(80);
  background: transparent;
  border: px2rem(1.5) solid #d7d7d7;
  border-radius: px2rem(3);

  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;

    .ebook-loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: px2rem(14) 0;
      box-sizing: border-box;

      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 px2rem(14);
        box-sizing: border-box;
        @include left;

        .ebook-loading-line {
          flex: 0 0 px2rem(32);
          width: px2rem(32);
          height: px2rem(2);
          background: #d7d7d7;
        }

        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: px2rem(2);
        }
      }
    }

    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: px2rem(1.5);
      height: 100%;
      background: #d7d7d7;
    }
  }
}

// .slide-content-loading {
//   position: relative;
//   z-index: 400;
//   width: px2rem(63);
//   height: px2rem(40);
//   background: transparent;
//   border: px2rem(1.5) solid #d7d7d7;
//   border-radius: px2rem(3);

//   .ebook-loading-wrapper {
//     display: flex;
//     width: 100%;
//     height: 100%;

//     .ebook-loading-item {
//       display: flex;
//       flex-direction: column;
//       flex: 1;
//       padding: px2rem(7) 0;
//       box-sizing: border-box;

//       .ebook-loading-line-wrapper {
//         flex: 1;
//         @include left;
//         padding: 0 px2rem(7);
//         box-sizing: border-box;

//         .ebook-loading-line {
//           flex: 0 0 px2rem(32);
//           width: px2rem(32);
//           height: px2rem(2);
//           background: #d7d7d7;
//         }

//         .ebook-loading-mask {
//           flex: 0 0 0;
//           width: 0;
//           height: px2rem(2);
//         }
//       }
//     }

//     .ebook-loading-center {
//       position: absolute;
//       left: 50%;
//       top: 0;
//       width: px2rem(1.5);
//       height: 100%;
//       background: #d7d7d7;
//     }
//   }
// }
</style>
