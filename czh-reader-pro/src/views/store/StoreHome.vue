<template>
  <div class="store-home">
    <!-- 搜索栏 -->
    <searchbar></searchbar>
    <!-- 弹出卡片动画 -->
    <flap-card :data="random"></flap-card>
    <!-- 首页滚动 -->
    <scroll :top="scorllTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${Bbanner}')`}"></div>
      </div>
      <!-- 猜你喜欢组件 随机生成9个 每次出现3 点换一批出现下3个 -->
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <!-- 热门推荐组件  -->
      <Recommend :data="recommend"></Recommend>
      <!-- 精选组件 -->
      <Featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.change')"></Featured>
      <!-- 分类组件 循环所有分类 并展示前三 -->
      <div class="category-list-wrapper" v-for="(item,index) in categoryList " :key="index">
        <category-book :data="item"></category-book>
      </div>
      <!-- 所有分类 -->
      <category :data="categories"></category>

    </scroll>

  </div>
</template>

<script>
import searchbar from '../../components/home/SearchBar'
import FlapCard from '../../components/home/FlapCard'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import Category from '../../components/home/Category'
import CategoryBook from '../../components/home/CategoryBook'
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
        this.lists = response.data
        // const data = response.data
        console.log(this.lists)
        //floor向下取整
        const randomIndex = Math.floor(Math.random() * this.lists.random.length)
        this.random = this.lists.random[randomIndex]
        this.banner = this.lists.banner
        this.guessYouLike = this.lists.guessYouLike
        // console.log(this.guessYouLike)
        this.recommend = this.lists.recommend
        this.featured = this.lists.featured
        this.categories = this.lists.categories
        this.categoryList = this.lists.categoryList
      }
    })
  },
  mixins: [homeMixin],
  components: {
    searchbar,
    scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  data() {
    return {
      lists: null,
      scorllTop: 94,
      random: null,
      banner: null,
      guessYouLike: null,
      Bbanner: 'https://i0.hdslb.com/bfs/sycp/creative_img/201908/9204e0c6624a63699364e20677a6ebcd.jpg@880w_440h.jpg',
      recommend: null,
      categories: null,
      categoryList: null,
      featured: null
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

    .banner-img {
      width: 100%;
      height: px2rem(160);
      background-repeat: no-repeat;
      background-size: px2rem(580) px2rem(280);
      background-position-x: 0%;
    }
  }

}
</style>
