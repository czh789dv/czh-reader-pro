<template>
  <!-- 根据分类 显示分类里的所有书籍 -->
  <div class="category-book">
    <title1 :label="categoryText(data.category)" :btn="$t('home.seeAll')" @click="showBookCategory"></title1>
    <div class="category-book-list">
      <div class="category-book-item" v-for="(item, index) in data.list" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img :src="item.cover" class="img">

        </div>
        <div class="content-wrapper">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  homeMixin
} from '../../utils/mixin'
import {
  categoryText,
  getCategoryName
} from '../../utils/store'
import title1 from './Title'
export default {
  mixins: [homeMixin],
  methods: {
    showBookCategory() {
      this.$router.push({
        path: '/store/list',
        query: {
          category: getCategoryName(this.data.category),
          categoryText: this.categoryText(this.data.category)
        }
      })
    },
    categoryText(category) {
      return categoryText(category, this)
    }
  },
  props: {
    data: Object
  },
  components: {
    title1
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.category-book {
  height: 100%;

  .category-book-list {
    width: 100%;
    @include top;
    padding: px2rem(5);
    box-sizing: border-box;

    .category-book-item {
      flex: 0 0 25%;
      width: 25%;
      padding: px2rem(5);
      box-sizing: border-box;

      .img-wrapper {
        @include center;

        .img {
          width: 100%;
        }
      }

      .content-wrapper {
        font-size: px2rem(12);

        .title {
          font-size: px2rem(14);
          margin-top: px2rem(5);
          @include ellipsis1(2);
        }

        .author {
          margin-top: px2rem(5);
          @include ellipsis1(2);
        }
      }
    }
  }
}
</style>
