<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-background">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="iconfont icon-close"></div>
    </div>
  </div>
</template>

<script>
import {
  FLAP_CARD_LIST
} from '../../utils/store'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  methods: {
    rotate(index, type) {
      const item = this.flapCardList[index]
      let dom
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      //改变DOM为修改后的角度 和颜色
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
    },
    //转动卡片
    startFlapCardAnimation() {
      // this.setFlapCardVisible(true)
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.IntervalTime)
    },
    //解决定时器导致的STYLE错误
    StopAnimation() {
      if (this.task) {
        clearInterval(this.task)
      }
      this.reset()
    },
    //重置全部数据
    reset() {
      this.front = 0
      this.back = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
    },
    //处理背面动画效果
    prepare() {
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      //总共转动9次 一次10
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.back, 'back')
    },
    //转动卡片
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCard.rotateDegree += 10
      frontFlapCard._g -= 5
      backFlapCard.rotateDegree -= 10
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5
      }
      //因为这里背面的值初始是0  永远到不了90 所以不能执行  需要额外处理背面的动画
      if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
        backFlapCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      //正面翻转180度 背面0度 调用下一步方法
      if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
        this.next()
      }
    },
    next() {
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      //将完成的卡片的角度和颜色 归位
      frontFlapCard.rotateDegree = 0
      frontFlapCard._g = frontFlapCard.g
      backFlapCard.rotateDegree = 0
      backFlapCard._g = backFlapCard.g
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      //指针指向下一个
      this.front++
      this.back++
      const len = this.flapCardList.length
      //放置溢出 超过列表长度归位
      if (this.front >= len) {
        this.front = 0
      }
      if (this.back >= len) {
        this.back = 0
      }
      //zIndex
      // 100 -> 96
      //99 ->100
      //98 -> 99
      //97 -> 98
      //96 -> 97
      //(0-1+5)%5 =4
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len)
        //  100-(0-1+5)%5=96
        //  100-(1-1+5)%5=100
      })
      this.prepare()
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    close() {
      this.setFlapCardVisible(false)
      this.StopAnimation()
    }
  },
  mixins: [homeMixin],
  components: {},
  data() {
    return {
      flapCardList: FLAP_CARD_LIST,
      front: 0,
      back: 1,
      IntervalTime: 10
    }
  },
  // mounted() {
  //   this.startFlapCardAnimation()
  // },
  //使用监听器启动
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.startFlapCardAnimation()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.flap-card-wrapper {
  width: 100%;
  height: 100%;
  @include absCenter;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  @include center;

  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: px2rem(45);
    z-index: 1100;
    width: 100%;
    @include center;

    .iconfont {
      width: px2rem(45);
      height: px2rem(45);
      font-size: px2rem(25);
      border-radius: 50%;
      background: #333;
      color: white;
      @include center;

    }
  }

  .flap-card-background {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    background: white;
    border-radius: px2rem(5);

    .flap-card {
      @include absCenter;
      width: px2rem(48);
      height: px2rem(48);

      .flap-card-circle {
        display: flex;
        width: 100%;
        height: 100%;

        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          backface-visibility: hidden;
        }

        .flap-card-semi-circle-left {
          // 上24右下左24
          border-radius: px2rem(24) 0 0 px2rem(24);
          background-position: center right;
          // 默认转动轴方向
          transform-origin: right;
        }

        .flap-card-semi-circle-right {
          border-radius: 0 px2rem(24) px2rem(24) 0;
          background-position: center left;
          transform-origin: left;
        }
      }
    }
  }
}
</style>
