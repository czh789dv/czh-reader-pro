<template>
  <div class="store-home">
    <!-- 搜索栏 -->
    <searchbar></searchbar>
    <!-- 弹出卡片动画 -->
    <flap-card :data="random"></flap-card>
    <!-- 首页滚动 -->
    <scroll :top="scorllTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <img :src="banner" class="banner-img">
      </div>
      <!-- 猜你喜欢组件 随机生成9个 每次出现3 点换一批出现下3个 -->
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <!-- 热门推荐组件  -->
      <!-- 精选组件 -->
      <!-- 分类组件 循环所有分类 并展示前三 -->
      <div class="category-list-wrapper"></div>
    </scroll>

  </div>
</template>

<script>
import searchbar from '../../components/home/SearchBar'
import FlapCard from '../../components/home/FlapCard'
import GuessYouLike from '../../components/home/GuessYouLike'
import scroll from '../../components/common/Scroll'
import {
  home
} from '../../api/store'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  mounted() {
    //axios获取数据
    home().then(response => {
      if (response && response.status === 200) {
        const data = response.data
        console.log(data)
        //floor向下取整
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
      }
    })
  },
  mixins: [homeMixin],
  components: {
    searchbar,
    scroll,
    FlapCard,
    GuessYouLike
  },
  data() {
    return {
      scorllTop: 94,
      random: null,
      banner: null,
      guessYouLike: null
    }
  },
  methods: {
    //捕捉SCROLL的Y轴偏移量
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scorllTop = 52
      } else {
        this.scorllTop = 94
      }
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.store-home {
  width: 100%;
  height: 100%;

  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img{
      width: 100%;
      height: px2rem(120);
    }
  }

}
</style>
