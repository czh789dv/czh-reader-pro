<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <!-- 弹出动画 -->
    <div class="flap-card-background" :class="{'animation': runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
      <div class="point-wrapper">
        <div class="point" v-for="(item,index) in pointList" :key="index" :class="{'animation': runPointAnimation}"></div>
      </div>
    </div>
    <!-- 随机推荐书籍 -->
    <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
      <!-- 图书弹出框整体 -->
      <div class="book-card-wrapper">
        <!-- 图片 -->
        <div class="img-wrapper">
          <img class="img" :src=" data ? data.cover : ''">
        </div>
        <!-- 文字信息 -->
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <!-- 按钮  点击跳转图书页 stop修饰符  -->
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn-wrapper" @click="close">
      <div class="iconfont icon-close"></div>
    </div>
  </div>
</template>

<script>
import {
  FLAP_CARD_LIST,
  categoryText
} from '../../utils/store'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  methods: {
    //获取章节文字
    categoryText() {
      if (this.data) {
        categoryText(this.data.category, this)
      } else {
        return ''
      }
    },
    //转动卡片
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
    //开始转动动画
    startFlapCardAnimation() {
      // this.setFlapCardVisible(true)
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.IntervalTime)
    },
    //关闭动画相关
    StopAnimation() {
      if (this.task) {
        clearInterval(this.task)
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.timeout2) {
        clearTimeout(this.timeout2)
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
      this.runFlapCardAnimation = false
      this.runPointAnimation = false
      this.runBookCardAnimation = false
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
    //处理下一张卡片
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
    //动态设置卡片的样式
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    //关闭动画
    close() {
      this.setFlapCardVisible(false)
      this.StopAnimation()
    },
    //开始小球动画
    startPonitAnimation() {
      this.runPointAnimation = true
      setTimeout(() => {
        this.runPointAnimation = false
      }, 1500)
    },
    //开始全部动画
    runAnimation() {
      this.runFlapCardAnimation = true
      this.timeout = setTimeout(() => {
        this.startFlapCardAnimation()
        this.startPonitAnimation()
      }, 300)
      this.timeout2 = setTimeout(() => {
        this.StopAnimation()
        this.runBookCardAnimation = true
      }, 2000)
    }
  },
  mixins: [homeMixin],
  components: {},
  data() {
    return {
      flapCardList: FLAP_CARD_LIST,
      front: 0,
      back: 1,
      IntervalTime: 5,
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false
    }
  },
  //接受父组件的数据
  props: {
    data: Object
  },
  created() {
    this.pointList = []
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`)
    }
  },
  // mounted() {
  //   console.log(this.data)
  // },
  //使用监听器启动
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.runAnimation()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
@import "../../assets/styles/flapCard";

.flap-card-wrapper {
  width: 100%;
  height: 100%;
  @include absCenter;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  @include center;

  .flap-card-background {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    background: white;
    border-radius: px2rem(5);
    //动画运行完成后 缩放为0 透明度为0
    transform: scale(0);
    opacity: 0;

    &.animation {
      //both 维持动画主体在100%
      animation: flap-card-move .3s ease-in both;
    }

    @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }

      50% {
        transform: scale(1.2);
        opacity: 1;
      }

      75% {
        transform: scale(0.9);
        opacity: 1;
      }

      100% {
        transform: scale(1);
        opacity: 1;
      }

    }

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

    .point-wrapper {
      z-index: 1500;
      @include absCenter;

      .point {
        border-radius: 50%;
        @include absCenter;

        &.animation {
          @for $i from 1 to length($moves) {
            &:nth-child(#{$i}) {
              @include move($i);
            }
          }
        }
      }
    }
  }

  .book-card {
    position: relative;
    width: 65%;
    max-width: px2rem(400);
    box-sizing: border-box;
    border-radius: px2rem(15);
    background: white;

    &.animation {
      animation: scale .3s ease-in both;

      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }

        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    .book-card-wrapper {
      margin-bottom: px2rem(30);
      width: 100%;
      height: 100%;
      //从上而下垂直居中布局
      @include columnTop;

      .img-wrapper {
        width: 100%;
        height: 100%;
        margin-top: px2rem(20);
        @include center;

        .img {
          width: px2rem(90);
          height: px2rem(130);
        }
      }

      .content-wrapper {
        padding: px2rem(10) px2rem(20);
        margin-top: px2rem(10);

        .content-title {
          color: #333;
          font-weight: bold;
          font-size: px2rem(18);
          line-height: px2rem(20);
          max-height: px2rem(40);
          text-align: center;
          @include ellipsis1(2)
        }

        .content-author {
          margin-top: px2rem(10);
          font-size: px2rem(12);
          line-height: px2rem(14);
          text-align: center;
        }

        .content-category {
          color: #999;
          font-size: px2rem(14);
          margin-top: px2rem(10);
          text-align: center;
        }
      }

      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 px2rem(15) px2rem(15);
        padding: px2rem(15) 0;
        text-align: center;
        color: white;
        font-size: px2rem(14);
        background: rgb(61, 155, 250);
      }

    }
  }

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
}
</style>
