<template>
  <div class="featured">
    <title1 :label="$t('home.featured')" :btn="$t('home.change')"></title1>
    <div class="featured-list">
      <div class="featured-item-wrapper">
        <div class="featured-item" v-for="(item,index) in data" :key="index">
          <div class="img-warpper">
            <img :src="item.cover" alt="" class="img">
          </div>
          <div class="content-wrapper">
            <div class="title">{{item.title}}</div>
            <div class="author">{{item.author}}</div>
            <div class="category">{{categoryText(item.category)}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Title1 from './Title'
import {
  categoryText
} from '../../utils/store'
export default {
  methods: {
    //返回类别
    categoryText(category) {
      return categoryText(category, this)
    }
  },
  props: {
    data: Array
  },
  components: {
    Title1
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.featured {

  .featured-list {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;

    .featured-item-wrapper {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;

      .featured-item {
        flex: 0 0 50%;
        width: 50%;
        padding: px2rem(5) 0;
        @include top;

        .img-warpper {
          flex: 0 0 30%;
          width: 30%;

          .img {
            width: 100%;
          }
        }

        .content-wrapper {
          flex: 1;
          width: px2rem(90);
          padding: 0 px2rem(5);
          font-size: px2rem(14);

          .title {
            margin-top: px2rem(5);
            @include ellipsis1(1);
          }

          .author {
            margin-top: px2rem(15);
            font-size: px2rem(12);
            @include ellipsis1(2);
          }

          .category {
            margin-top: px2rem(5);
            @include center;
          }
        }
      }
    }
  }
}
</style>
